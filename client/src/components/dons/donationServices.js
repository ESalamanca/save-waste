// components/auth/auth-service.js

import axios from "axios";

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/`,
    withCredentials: true
  }),

  createDonation(donationBox, pickDate, location, GeoLoc) {
    return this.service
      .post("/donations/new-donation", {
        donationBox,
        pickDate,
        location,
        GeoLoc
      })
      .then(response => response.data);
  },

  getDonationsAvailable() {
    return (
      this.service
        .get("/donations/available")
        // WARNING PAS SUR DE CE QUE JE FAIS
        .then(response => response.data)
    );
  },

  getDonationsGiver() {
    return this.service.get("/donations/giver").then(response => {
      // console.log("donations", response.data);
      return response.data;
    });
  },

  getDonationsAssociation() {
    return this.service.get("/donations/taker").then(response => {
      // console.log("donations", response.data);
      return response.data;
    });
  },

  bookDonation(donationID) {
    return this.service.put(`/donations/book/${donationID}`).then(response => {
      return response.data;
    });
  },

  pickDonation(donationID) {
    console.log("function pickDonation called");
    return this.service.put(`/donations/pick/${donationID}`).then(response => {
      console.log("picked", response.data);
      return response.data;
    });
  },

  deleteDonation(donationID) {
    return this.service
      .delete(`/donations/delete/${donationID}`)
      .then(response => {
        return response.data;
      });
  }
};
