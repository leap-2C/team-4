
const user = userSchema = Schema({

    email: { type : String, required: true , unique: true},
    password: {type : String }, 
    username: {type : String },
    receivedDonations: {ref : 'donation', },
    timestamps : { type: Date, default: Date.now },
})