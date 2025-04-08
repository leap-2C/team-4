const donationsSchema = {
  amount: {
    type: Number,
  },
  specialMessage: {type :String} ,
  socialURLorBuyMeACoffee: {type :String} ,
  donorId: {type :String} ,
  recipientId: {type :String} ,
  timestamps : { type: Date, default: Date.now },
};

export default donationsSchema;