import React from "react";
import UnitDonCard from "./UnitDonCard";
import donationServices from "./donationServices";
import moment from "moment";

class CarddonAvailable extends React.Component {
  state = {
    isOpen: this.props.isOpen,
    statusDon: this.props.status,
  };
  toggleCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  deleteDon = () => {
    donationServices
      .deleteDonation(this.props._id)
      .then((response) => this.props.fetchDonationsUser());
  };

  bookDon = () => {
    donationServices.bookDonation(this.props._id).then((donation) => {
      this.props.fetchDonationsAvailable();
      this.props.history.push("/dashboard");
    });
  };

  render() {
    const cardHeading = {
      pending: "Panier Disponible",
      booked: "Panier Réservé",
      pickedUp: "Panier Récupéré",
    };
    const dateRecuperation = moment(this.props.pickDate).format("DD/MM/YY");

    return (
      <div className="card_dons" id={this.props._id}>
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
                  alt="Logo chevron open"
                  style={{ cursor: "pointer" }}
                />
                {this.state.isOpen}
              </div>
            </div>

            {this.props.donationBox.map(
              (unitDon) =>
                this.props.user && (
                  <UnitDonCard
                    key={unitDon._id}
                    user={this.props.user}
                    {...unitDon}
                  />
                )
            )}
            <div className="dateRecup">
              <div>
                <img src="/calendar-month.svg" alt="calendar" />
              </div>
              <div className="wordingRecup">A récupérer avant le : {dateRecuperation}</div>
            </div>
            <div className="placeRecup">
              <div>
                <img src="/check-in.svg" alt="check-in " />
              </div>
              <div>{this.props.location}</div>
            </div>

            {this.props.user.clientType === "association" ? (
              <button className="btn" onClick={this.bookDon}>
                Réserver
              </button>
            ) : (
              <div className="buttonsCardDon">
                <button className="btn">Modifier</button>
                <img
                  src="/delete.svg"
                  alt="delete"
                  onClick={() => this.deleteDon()}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}

            {/*Renvoi au formulaire de don */}
          </div>
        )}
      </div>
    );
  }
}
export default CarddonAvailable;
