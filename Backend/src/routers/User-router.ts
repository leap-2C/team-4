import express from "express";
import createUser from "../controller/User/CreateUser";

export const userRouter = express.Router()

userRouter.post("/", createUser);
