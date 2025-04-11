import express from "express";
import getCards from "../controller/Bank-Card/GetCards";
import createCard from "../controller/Bank-Card/CreateCard";
import updateCard from "../controller/Bank-Card/UpdateCard";
import { Authorization } from "../MiddleWare/Authorization";

const Bankrouter = express.Router();

Bankrouter.get("/:userId",Authorization, getCards);
Bankrouter.post("/:userId",Authorization, createCard);
Bankrouter.patch("/:bankCardId",Authorization ,updateCard);

export default Bankrouter;
