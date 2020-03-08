const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    companyName: String,
    clientType: { type: String, enum: ["association", "restaurant"] },
    contactName: String,
    email: String, //email
    password: String,
    phone: Number,
    siret: Number, //uniquement sociétés
    address: {
      street: String,
      zipCode: Number,
      city: String,
      geo: {
        lat: Number,
        long: Number
      }
    },
    imageUrl: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;