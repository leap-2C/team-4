import express from "express";
import createUser from "../controller/User/CreateUser";
import login from "../controller/User/Login";

export const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/login", login);
