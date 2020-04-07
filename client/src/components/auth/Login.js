import React from "react";

import { Link } from "react-router-dom";

import authService from "./auth-service.js";

export default class extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    authService
      .login(this.state.email, this.state.password)
      .then((response) => {
        this.setState({ error: "" });

        this.props.updateUser(response);
        this.props.history.push("/");
      })
      .catch((err) => this.setState({ error: err.message }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    this.props.getCurrentPageName("SaveWaste");
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <h1>Je me connecte</h1>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button className="btn" type="submit">
          Connexion
        </button>
        <p>
          Vous n'avez pas de compte? <Link to="/signup">Créer un compte</Link>
        </p>
      </form>
    );
  }
}
