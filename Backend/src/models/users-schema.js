import bankCardSchema from "./bank-card-schema.js";
import donationsSchema from "./donations-schema.js";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    username: { type: String },
    receivedDonations: { type: donationsSchema },
    timestamps: { type: Date, default: Date.now },
    profileId : { Number},
    bankCard: { type: bankCardSchema }
});
export default userSchema ;