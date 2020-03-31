import React from "react";

import donationServices from "../dons/donationServices";
import CarddonAvailable from "./Card_available";

class ListDons extends React.Component {
  state = {
    donationsAvailable: []
  };

  fetchDonationsAvailable = () => {
    donationServices
      .getDonationsAvailable()
      .then(data => this.setState({ donationsAvailable: data }))
      .catch(err => this.setState({ donationsAvailable: {} }));
  };

  componentDidMount = () => {
    this.fetchDonationsAvailable();
  };

  render() {
    return (
      <div className="listDonsAvailable">
        {this.state.donationsAvailable.length === 0 ? (
          <div>Il n'y a pas de dons diponibles</div>
        ) : null}
        {this.state.donationsAvailable.map(don => (
          <CarddonAvailable
            key={don._id}
            user={this.props.user}
            fetchDonationsAvailable={this.fetchDonationsAvailable}
            history={this.props.history}
            {...don}
          />
        ))}
      </div>
    );
  }
}
export default ListDons;
