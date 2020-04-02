import React from "react";

import KpiTop from "./KpiTop.js";
import KpiBottom from "./KpiBottom.js";
import CarddonBooked from "../dons/Card_booked.js";
import CarddonAvailable from "../dons/Card_available.js";
import CarddonPicked from "../dons/Card_picked.js";
import donationServices from "../dons/donationServices";

//import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  state = {
    donations: []
  };

  // PERMET DE RENDRE LE TITRE DE LA PAGE DYBAMIQUE --> A REPLACER
  // componentDidMount(){
  //   this.props.getCurrentPageName("Tableau de bord");
  // }
  // render(){
  //   return(
  // state = {
  //   donations: []
  // };
  fetchDonationsUser = () => {
    if (this.props.user.clientType === "restaurant") {
      this.fetchDonationsRestaurant();
    } else {
      this.fetchDonationsAssociation();
    }
  };
  fetchDonationsRestaurant = () => {
    donationServices
      .getDonationsGiver()
      .then(data => this.setState({ donations: data }))
      .catch(err => this.setState({ donations: {} }));
  };

  fetchDonationsAssociation = () => {
    donationServices
      .getDonationsAssociation()
      .then(data => this.setState({ donations: data }))
      .catch(err => this.setState({ donations: {} }));
  };

  componentDidMount = () => {
    this.fetchDonationsUser();
  };

  render() {
    //const isResto = this.props.user.clientType === "restaurant"

    const donsDone = this.state.donations.filter(
      don => don.status === "pickedUp"
    );
    const donsBooked = this.state.donations.filter(
      don => don.status === "booked"
    );
    const donsAvailable = this.state.donations.filter(
      don => don.status === "pending"
    );
    const amount = 7 * donsDone.length;
    const nbmealsGiven = donsDone.length * 5;
    const emissionsCO2 = donsDone.length * 20;

    return (
      <div className="dashboard">
        <KpiTop
          amount={amount}
          nbDonsOnGoing={donsBooked.length + donsAvailable.length}
        />

        {this.props.user.clientType === "restaurant"
          ? donsAvailable.map(don => (
              <CarddonAvailable
                fetchDonationsUser={this.fetchDonationsUser}
                key={don._id}
                user={this.props.user}
                history={this.props.history}
                {...don}
              />
            ))
          : null}

        {donsBooked.map(don => (
          <CarddonBooked
            key={don._id}
            fetchDonationsUser={this.fetchDonationsUser}
            user={this.props.user}
            history={this.props.history}
            {...don}
          />
        ))}

        {/* {donsDone.map(don => (
          <CarddonPicked key={don._id} user={this.props.user} {...don} />
        ))} */}

        <KpiBottom
          donsDone={donsDone}
          nbmealsGiven={nbmealsGiven}
          emissionsCO2={emissionsCO2}
        />
      </div>
    );
  }
}
export default Dashboard;
