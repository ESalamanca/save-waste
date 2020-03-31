import React from "react";
import UnitDonCard from "./UnitDonCard";
import donationServices from "./donationServices";


class CarddonAvailable extends React.Component {
  state = {
    isOpen: false,
    statusDon: this.props.status
  };
  toggleCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  // imgProductType = productType => {
  //   let img_product = "altIMG";
  //   if (productType === "légume") {
  //     img_product = "carrot.svg";
  //   }
  //   return img_product;
  // };

  bookDon = () => {
    donationServices.bookDonation(this.props._id).then(donation => {
      this.props.history.push("/dashboard");
    });
  };

  pickupDon = () => {
    //TODO : faire tout pour récupérer le don
  };
  render() {
    const cardHeading = {
      pending: "Panier Disponible",
      booked: "Panier Réservé",
      pickedUp: "Panier Récupéré"
    };

    //Le bouton pour les associations
    const cardButton = {
      pending: (
        <button className="btn" onClick={this.bookDon}>
          Réserver
        </button>
      ),
      booked: (
        <button className="btn" onClick={this.pickupDon}>
          Récupéré
        </button>
      ),
      pickedUp: ""
    };

    return (
      <div className="card_dons">
        {!this.state.isOpen && (
          <div className="cardClosed">
            <img src="./Gift-Box.png" alt="Logo panier" />
            <p>{cardHeading[this.state.statusDon]}</p>

            <div className="toggleButton">
              <img
                onClick={this.toggleCard}
                src="./icon_fleche_closed.svg"
                alt="Logo chevron closed"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}
        {this.state.isOpen && (
          <div className="cardOpen">
            <div className="btn-open">
              <img src="./Gift-Box.png" alt="Logo panier" />
              <p>{cardHeading[this.state.statusDon]}</p>
              <div className="toggleButton">
                <img
                  onClick={this.toggleCard}
                  src="./icon_fleche_open.svg"
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
            {this.props.user.clientType === "association" ? (
              cardButton[this.state.statusDon]
            ) : (
              <button className="btn">Modifier</button>
            )}

            {/*Renvoi au formulaire de don */}
          </div>
        )}
      </div>
    );
  }
}
export default CarddonAvailable;
