import React from "react";

import donationServices from "../dons/donationServices";
import CarddonAvailable from "./Card_available";
import MapContainer from "../map/MapContainer";

class ListDons extends React.Component {
  state = {
    donationsAvailable: [],
    cardOpen: null,
  };

  fetchDonationsAvailable = () => {
    donationServices
      .getDonationsAvailable()
      .then((data) => this.setState({ donationsAvailable: data }))
      .catch((err) => this.setState({ donationsAvailable: {} }));
  };

  toggleCard = (id) => {
    console.log("called toggleCard", id);
    this.setState({ cardOpen: id });
  };
  componentDidMount = () => {
    this.fetchDonationsAvailable();
    this.props.getCurrentPageName("Dons Disponibles");
  };

  render() {

    return (
      <div className="listDonsAvailable">
        {this.state.donationsAvailable.length === 0 ? (
          <div>Il n'y a pas de dons diponibles</div>
        ) : (
          <div>
            <div className="GoogleMap">
              <MapContainer
                donations={this.state.donationsAvailable}
                toggleCard={this.toggleCard}
                google={true}
              />
            </div>

            <div className="listDons">
              {this.state.donationsAvailable.map((don) => (
                <CarddonAvailable
                  key={don._id}
                  isOpen={this.state.cardOpen === don._id}
                  user={this.props.user}
                  fetchDonationsAvailable={this.fetchDonationsAvailable}
                  history={this.props.history}
                  {...don}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ListDons;
