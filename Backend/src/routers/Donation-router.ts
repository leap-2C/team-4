import express from "express";
import createDonation from "../controller/Donation/create-donation";
import getReceivedDonations from "../controller/Donation/received";
import getTotalEarnings from "../controller/Donation/total-earnings";
import searchDonations from "../controller/Donation/search-donations";

const router = express.Router();

router.post("/create-donation", createDonation);
router.get("/received/:userId", getReceivedDonations);
router.get("/total-earnings/:userId", getTotalEarnings);
router.get("/search-donations/:userId", searchDonations);

export default router;
