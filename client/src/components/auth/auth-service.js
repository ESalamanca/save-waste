// components/auth/auth-service.js

import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || "http://localhost:5000"}/auth`,
    withCredentials: true
  }),

  login(mail, password) {
    return this.service.post('/login', {mail, password})
      .then(response => response.data)
  },

  signup(username, mail, password) {
    return this.service.post('/signup', {
      username,
      mail,
      password
    })
      .then(response => response.data)
  },

  loggedin() {
    return this.service.get('/loggedin')
      .then(response => response.data)
  },

  logout() {
    return this.service.get('/logout', {})
      .then(response => response.data)
  },

  edit({ clientType, username, mail }) {
    return this.service.post('/edit', {
      clientType,
      username,
      mail
    })
      .then(response => response.data)
  },

  upload(formdata) {
    return this.service.post('/upload', formdata)
      .then(response => response.data)
  }
};