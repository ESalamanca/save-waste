import React from "react";
import UnitDonCard from "./UnitDonCard";
import donationServices from "./donationServices";

class CarddonBooked extends React.Component {
  state = {
    isOpen: false,
    statusDon: this.props.status
  };
  toggleCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  pickupDon = () => {
    donationServices.pickDonation(this.props._id).then(donation => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    const cardHeading = {
      pending: "Panier Disponible",
      booked: `Panier Réservé`
    };

    //Le bouton pour les associations

    return (
      <div className="card_dons">
        {!this.state.isOpen && (
          <div className="cardClosed">
            <img src="/Gift-Box.png" alt="Logo panier" />
            <p>{cardHeading[this.state.statusDon]}</p>

            <div className="toggleButton">
              <img
                onClick={this.toggleCard}
                src="/icon_fleche_closed.svg"
                alt="Logo chevron closed"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}
        {this.state.isOpen && (
          <div className="cardOpen">
            <div className="btn-open">
              <img src="/Gift-Box.png" alt="Logo panier" />
              <p>{cardHeading[this.state.statusDon]}</p>
              <div className="toggleButton">
                <img
                  onClick={this.toggleCard}
                  src="/icon_fleche_open.svg"
                  alt="Logo chevron open "
                />
                {this.state.isOpen}
              </div>
            </div>

            {this.props.donationBox.map(
              unitDon =>
                this.props.user && (
                  <UnitDonCard
                    key={unitDon._id}
                    user={this.props.user}
                    {...unitDon}
                  />
                )
            )}
            <p>Récupération à {this.props.location}</p>

            {this.props.user.clientType === "association" ? (
              <button className="btn" onClick={this.pickupDon}>
                Récupérer
              </button>
            ) : null}

            {/*Renvoi au formulaire de don */}
          </div>
        )}
      </div>
    );
  }
}
export default CarddonBooked;
