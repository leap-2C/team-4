import express from "express";

import createUser from "../controller/User/CreateUser";
import login from "../controller/User/Login";
import { deleteUser  } from "../controller/User/DeleteUser";
import updateUser from "../controller/User/UpdateUser";

import { Authorization } from "../MiddleWare/Authorization";




export const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", login);
userRouter.delete("/:id", Authorization , deleteUser,);
userRouter.put("/:id", Authorization , updateUser);


