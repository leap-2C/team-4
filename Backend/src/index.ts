import express, { Router } from "express";
import { userRouter } from "./routers/User-router";
import Bankrouter from "./routers/Bank-router";
import Donationrouter from "./routers/Donation-router";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/bank-card", Bankrouter);
app.use("/donation", Donationrouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
