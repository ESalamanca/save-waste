const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unityDonationSchema = new Schema({
  productName: String,
  productType: {
    type: String,
    enum: ["Légumes", "Fruits", "Viande", "Divers"],
    default: "Divers"
  },
  quantity: {
    value: Number,
    qtyType: {
      type: String,
      enum: ["qty", "kg"],
      default: "kg"
    }
  },
  expirationDate: Date,
  
});

const donationSchema = new Schema(
  {
    //Je propose de ne pas garder donationName, on pourra le calculer si besoin, pas nécessaire de le stocker
    donationBox: [unityDonationSchema],
    giver: { type: Schema.Types.ObjectId, ref: "User" },
    boxExpirationDate: Date, //automatically generated in function of donationBox earliest exp date
    status: {
      type: String,
      enum: ["pending", "booked", "pickedUp"],
      default: "pending"
    },
    taker: { type: Schema.Types.ObjectId, ref: "User" },
    pickDate: Date,
    location: "",
    GeoLoc: {
      lat: Number,
      lng: Number
    }
    // {
    //   //is by default giver's registered address
    //   street: String,
    //   zipCode: Number,
    //   city: String,
    //   geo: {
    //     lat: Number,
    //     long: Number
    //   }
    // }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
