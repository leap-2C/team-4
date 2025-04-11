import express from "express";
import createDonation from "../controller/Donation/create-donation";
import getReceivedDonations from "../controller/Donation/received";
import getTotalEarnings from "../controller/Donation/total-earnings";
import searchDonations from "../controller/Donation/search-donations";
import { Authorization } from "../MiddleWare/Authorization";

const Donationrouter = express.Router();

Donationrouter.post("/create-donation",Authorization, createDonation);
Donationrouter.get("/received/:userId",Authorization, getReceivedDonations);
Donationrouter.get("/total-earnings/:userId",Authorization, getTotalEarnings);
Donationrouter.get("/search-donations/:userId",Authorization, searchDonations);

export default Donationrouter;
