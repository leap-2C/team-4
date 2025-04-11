import express from "express";
import getCards from "../controller/Bank-Card/GetCards";
import createCard from "../controller/Bank-Card/CreateCard";
import updateCard from "../controller/Bank-Card/UpdateCard";

const Bankrouter = express.Router();

Bankrouter.get("/:userId", getCards);
Bankrouter.post("/:userId", createCard);
Bankrouter.patch("/:bankCardId", updateCard);

export default Bankrouter;
