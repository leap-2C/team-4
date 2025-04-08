import { UserModel } from "../../models/users-schema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


export const createUser = async (req, res) => {
  try {
    const { mail, password, phoneNumber, address } = req.body;

    if (!mail) {
      return res.status(400).json({ message: "Mail шаардлагатай." });
    }

    const existingUser = await UserModel.findOne({ mail });
    if (existingUser) {
      return res.status(400).json({
        message: "Хэрэглэгч аль хэдийн бүртгэлтэй байна.",
      });
    }

    const token = jwt.sign(
      { email: mail, password, phoneNumber, address },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    const verificationLink = `https://food-backend-sigma.vercel.app/users/verify?token=${token}`;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: mail,
      subject: "Verify your email",
      html: `
        <h2>Имэйлээ баталгаажуулна уу</h2>
        <p>Доорх линк дээр дарж баталгаажуулна уу:</p>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    };

    const newUser = new UserModel({
      mail,
      password,
      phoneNumber,
      address,
      isVerified: false,
      verificationToken: token,
      
    });

    await newUser.save();
    console.log("Хадгалсан хэрэглэгч:", newUser);
    await transporter.sendMail(mailOptions);

    console.log("Баталгаажуулах имэйл амжилттай илгээгдлээ.");
    res.status(201).json({
      message: "Баталгаажуулах имэйл илгээгдлээ. Имэйлээ шалгана уу!",
    });
  } catch (err) {
    console.error("Алдаа:", err);
    res.status(500).json({ message: "Серверийн алдаа." });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { token } = req.query;
    console.log("Received token:", token);

    if (!token) {
      return res.status(400).json({ message: "Токен шаардлагатай." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({
      mail: decoded.email,
      verificationToken: token,
    });

    console.log("Found user:", user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Буруу эсвэл хугацаа дууссан токен." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Имэйл амжилттай баталгаажлаа!" });
  } catch (err) {
    console.error("Баталгаажуулах алдаа:", err);
    res
      .status(500)
      .json({ message: "Серверийн алдаа эсвэл хугацаа дууссан токен." });
  }
};
