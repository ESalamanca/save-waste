import React from "react";

import authService from "./auth-service.js";
import { Link, Redirect } from "react-router-dom";

export default class extends React.Component {
  render() {
    return (
      <>
        {!this.props.user._id ? (
          <Redirect to="/" />
        ) : (
          <div className="container profile">
            <h1>Mes informations</h1>
            <img
              className="avatar"
              src={
                this.props.user.imageUrl ||
                "https://material.io/tools/icons/static/icons/baseline-person-24px.svg"
              }
            />

            <div className="info">
              <div className="profile-item">
                <h3>Nom</h3>
                <p>{this.props.user.companyName}</p>
              </div>
              <div className="profile-item">
                <h3>
                  {this.props.user.clientType.slice(0, 1).toUpperCase() +
                    this.props.user.clientType.slice(1)}
                </h3>
              </div>
              <div className="profile-item">
                <h3>email</h3>
                <p>{this.props.user.email}</p>
              </div>
              <div className="profile-item">
                <h3>Contact</h3>
                <p>
                  {this.props.user.contactName ? (
                    <span>{this.props.user.contactName}</span>
                  ) : (
                    " "
                  )}
                </p>
              </div>
              <div className="profile-item">
                <h3>Téléphone</h3>
                <p>
                  {this.props.user.phone ? (
                    <span>{this.props.user.phone}</span>
                  ) : (
                    " "
                  )}
                </p>
              </div>
              <div className="profile-item">
                <h3>Adresse</h3>
                <p>
                  {this.props.user.address ? (
                    <span>{this.props.user.address}</span>
                  ) : (
                    " "
                  )}
                </p>
              </div>

              {this.props.user.clientType === "restaurant" ? (
                <div className="profile-item">
                  <h3>Siret</h3>
                  <p>
                    {this.props.user.siret ? (
                      <span>{this.props.user.address.siret}, </span>
                    ) : (
                      " "
                    )}
                  </p>
                </div>
              ) : null}
            </div>

            <Link
              className="editIcon"
              style={{ textDecoration: "none" }}
              to="/profile/edit"
            >
              <button className="btn">Modifier</button>
            </Link>
          </div>
        )}
      </>
    );
  }
}
