import React from "react";

import KpiTop from "./KpiTop.js";
import KpiBottom from "./KpiBottom.js";
import CarddonBooked from "../dons/Card_booked.js";
import CarddonAvailable from "../dons/Card_available.js";
import CarddonPicked from "../dons/Card_picked.js";
import donationServices from "../dons/donationServices";


class Dashboard extends React.Component {
  state = {
    donations: [],
    donationsAvailable: 0,
  };

  fetchDonationsUser = () => {
    console.log("fetched donations");
    if (this.props.user.clientType === "restaurant") {
      this.fetchDonationsRestaurant();
    } else {
      this.fetchDonationsAssociation();
    }
  };
  fetchDonationsRestaurant = () => {
    donationServices
      .getDonationsGiver()
      .then((data) => this.setState({ donations: data }))
      .catch((err) => this.setState({ donations: {} }));
  };

  fetchDonationsAssociation = () => {
    donationServices
      .getDonationsAssociation()
      .then((data) => this.setState({ donations: data }))
      .catch((err) => this.setState({ donations: {} }));
  };

  fetchDonationsAvailable = () => {
    donationServices
      .getDonationsAvailable()
      .then((data) => this.setState({ donationsAvailable: data.length }))
      .catch((err) => this.setState({ donationsAvailable: 0 }));
  };

  componentDidMount = () => {
    this.props.getCurrentPageName("Tableau de bord");
    this.fetchDonationsUser();
    this.fetchDonationsAvailable();
  };

  render() {

    const donsDone = this.state.donations.filter(
      (don) => don.status === "pickedUp"
    );
    const donsBooked = this.state.donations.filter(
      (don) => don.status === "booked"
    );
    const donsAvailable = this.state.donations.filter(
      (don) => don.status === "pending"
    );
    const amount = 7 * donsDone.length;
    const nbmealsGiven = donsDone.length * 5;
    const emissionsCO2 = donsDone.length * 20;

    return (
      <div className="dashboard">
        <KpiTop
          user={this.props.user}
          amount={amount}
          nbDonsOnGoing={
            this.props.user.clientType === "restaurant"
              ? donsBooked.length + donsAvailable.length
              : donsBooked.length
          }
          donationsAvailable={this.state.donationsAvailable}
        />

        {this.props.user.clientType === "restaurant"
          ? donsAvailable.map((don) => (
              <CarddonAvailable
                fetchDonationsUser={this.fetchDonationsUser}
                key={don._id}
                user={this.props.user}
                history={this.props.history}
                {...don}
              />
            ))
          : null}

        {donsBooked.map((don) => (
          <CarddonBooked
            key={don._id}
            fetchDonationsUser={this.fetchDonationsUser}
            user={this.props.user}
            history={this.props.history}
            {...don}
          />
        ))}

        <KpiBottom
          donsDone={donsDone}
          nbmealsGiven={nbmealsGiven}
          emissionsCO2={emissionsCO2}
          user={this.props.user}
        />
      </div>
    );
  }
}
export default Dashboard;
