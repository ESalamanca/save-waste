// components/auth/auth-service.js

import axios from "axios";

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/`,
    withCredentials: true
  }),

  login(email, password) {
    return this.service
      .post("/sessions", { email, password })
      .then(response => {
        console.log(response.data);
        return response.data;
      });
  },

  signup(email, password, companyName, clientType) {
    return this.service
      .post("/users", {
        email,
        password,
        companyName,
        clientType
      })
      .then(response => response.data);
  },

  loggedin() {
    return this.service.get("/user").then(response => response.data);
  },

  logout() {
    return this.service.delete("/session", {}).then(response => response.data);
  },

  edit({
    clientType,
    companyName,
    email,
    contactName,
    address,
    GeoLoc,
    siret,
    imageUrl,
    phone
  }) {
    return this.service
      .put("/users/edit", {
        clientType,
        companyName,
        email,
        contactName,
        address,
        GeoLoc,
        siret,
        imageUrl,
        phone
      })
      .then(response => response.data);
  },

  upload(formdata) {
    return this.service
      .post("/users/upload", formdata)
      .then(response => response.data);
  }
};
