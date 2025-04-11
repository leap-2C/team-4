import express from "express";
import createDonation from "../controller/Donation/create-donation";
import getReceivedDonations from "../controller/Donation/received";
import getTotalEarnings from "../controller/Donation/total-earnings";
import searchDonations from "../controller/Donation/search-donations";

const Donationrouter = express.Router();

Donationrouter.post("/create-donation", createDonation);
Donationrouter.get("/received/:userId", getReceivedDonations);
Donationrouter.get("/total-earnings/:userId", getTotalEarnings);
Donationrouter.get("/search-donations/:userId", searchDonations);

export default Donationrouter;
