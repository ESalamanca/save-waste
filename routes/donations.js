const express = require("express");
const passport = require("passport");
const router = express.Router();
const Donation = require("../models/Donation");
const User = require("../models/User");

router.post("/new-donation", (req, res, next) => {
  if (!req.user || !req.user.clientType === "restaurant") {
    res.status(401).json({
      message: "Vous devez être un restaurateur authentifié pour créer des dons"
    });
    return;
  }

  if (!req.body.donationBox || req.body.donationBox.length === 0) {
    res.status(401).json({ message: "Vous devez donner au moins un produit" });
    return;
  }
  const donationBox = req.body.donationBox; //Array of donation items
  const giver = req.user._id;
  const status = "pending";
  const location = req.body.location || req.user.address || "";
  const GeoLoc = req.body.GeoLoc || req.user.GeoLoc || {};
  //NE FONCTIONNE PAS
  // const boxExpirationDate = new Date(
  //   Math.max(donationBox.map(donation => donation.expirationDate))
  // );

  const newDonation = new Donation({
    donationBox,
    // boxExpirationDate,
    giver,
    status,
    location,
    GeoLoc
  });
  console.log("newDonation", newDonation);
  newDonation
    .save()
    .then(donation => {
      //User.findByIdAndUpdate(giver, { $push: { donationsArray: donation._id }});
      res.status(201).json(donation);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Something went wrong during donation save" });
    });
});

//Récupération des dons d'un restaurant
router.get("/giver", (req, res, next) => {
  if (!req.user || !req.user.clientType === "restaurant") {
    res.status(401).json({
      message:
        "Vous devez être un restaurant authentifié pour visioner vos dons"
    });
    return;
  }

  Donation.find({ giver: req.user._id })
    .populate("taker giver")
    .then(listDonations => {
      res.status(201).json(listDonations);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Something went wrong during donations request" });
    });
});

//Récupération des dons d'une association
router.get("/taker", (req, res, next) => {
  if (!req.user || !req.user.clientType === "association") {
    res.status(401).json({
      message:
        "Vous devez être une association authentifiée pour visioner vos dons"
    });
    return;
  }

  Donation.find({ taker: req.user._id })
    .populate("giver taker")
    .then(listDonations => {
      res.status(201).json(listDonations);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Something went wrong during donations request" });
    });
});

//Récupère tous les dons pending pour les associations
router.get("/available", (req, res, next) => {
  if (!req.user || !req.user.clientType === "association") {
    res.status(401).json({
      message:
        "Vous devez être une association authentifiée pour visioner les dons disponibles"
    });
    return;
  }

  Donation.find({ status: "pending" })
    .populate("giver")
    .then(listDonations => {
      res.status(201).json(listDonations);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Something went wrong during donations request" });
    });
});

//Réservation d'un Don par une association
router.put("/book/:id", (req, res, next) => {
  if (!req.user || !req.user.clientType === "association") {
    res.status(401).json({
      message:
        "Vous devez être une association authentifiée pour réserver un don"
    });
    return;
  }
  const id = req.params.id;
  Donation.findByIdAndUpdate(
    id,
    { status: "booked", taker: req.user._id },
    function(err, donation) {
      if (err)
        return res
          .status(500)
          .json({ message: "Something went wrong during donations request" });
      res.status(201).json(donation);
    }
  );
});

//Récupération du don par une association
router.put("/pick/:id", (req, res, next) => {
  if (!req.user || !req.user.clientType === "association") {
    res.status(401).json({
      message:
        "Vous devez être une association authentifiée pour récupérer un don"
    });
    return;
  }
  const id = req.params.id;
  Donation.findByIdAndUpdate(id, { status: "pickedUp" }, function(
    err,
    donation
  ) {
    if (err)
      return res
        .status(500)
        .json({ message: "Something went wrong during donations request" });
    res.status(201).json(donation);
  });
});

//Suppression d'un don
router.delete("/delete/:id", (req, res, next) => {
  if (!req.user || !req.user.clientType === "restaurant") {
    res.status(401).json({
      message: "Vous devez être un restaurant authentifié pour supprimer un don"
    });
    return;
  }
  const id = req.params.id;
  Donation.findOneAndDelete({ _id: id }, function(err, donation) {
    if (err) console.log(err);
    if (!donation.giver === req.user._id) {
      return res.status(401).json({
        message:
          "Vous devez être un restaurant authentifié pour supprimer un don"
      });
    }
    console.log("Successful deletion");
  });
});

module.exports = router;
