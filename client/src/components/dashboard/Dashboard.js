import React from "react";

import KpiTop from "./KpiTop.js";
import KpiBottom from "./KpiBottom.js";
import MenuBar from "../navigation/MenuBar.js";
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

  fetchDonationsRestaurant = () => {
    if (this.state.donations.length === 0) {
      donationServices
        .getDonationsGiver()
        .then(data => this.setState({ donations: data }))
        .catch(err => this.setState({ donations: {} }));
    } else {
      console.log("donations already in the state");
    }
  };

  fetchDonationsAssociation = () => {
    if (this.state.donations.length === 0) {
      donationServices
        .getDonationsAssociation()
        .then(data => this.setState({ donations: data }))
        .catch(err => this.setState({ donations: {} }));
    } else {
      console.log("donations already in the state");
    }
  };

  componentDidMount = () => {
    console.log("searching donations");
    if (this.props.user.clientType === "restaurant") {
      this.fetchDonationsRestaurant();
    } else {
      this.fetchDonationsAssociation();
    }
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
