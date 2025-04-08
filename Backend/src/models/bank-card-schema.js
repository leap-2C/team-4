

const bankCardSchema = {
country : { type : String},
firstname: { type : String},
lastname: { type : String},
cardNumber: { type : String},
expiryDate : { type : Date},
cvv : { type : String},
timestamps : { type: Date, default: Date.now },

}
export default bankCardSchema ;