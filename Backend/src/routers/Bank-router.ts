import express from "express";
import getCards from "../controller/Bank-Card/GetCards";
import createCard from "../controller/Bank-Card/CreateCard";
import updateCard from "../controller/Bank-Card/UpdateCard";

const router = express.Router();

router.get("/:userId", getCards);
router.post("/:userId", createCard);
router.patch("/:bankCardId", updateCard);

export default router;
