import express, { Router } from "express";
import { userRouter } from "./routers/User-router";

import dotenv from "dotenv"; 

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/profile", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
