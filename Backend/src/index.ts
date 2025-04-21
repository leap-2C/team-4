import express, { Router } from "express";
import { userRouter } from "./routers/User-router";
import Bankrouter from "./routers/Bank-router";
import Donationrouter from "./routers/Donation-router";
import { profileRouter } from "./routers/Profile-router";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

app.use(cors());
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/bank-card", Bankrouter);
app.use("/donation", Donationrouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
