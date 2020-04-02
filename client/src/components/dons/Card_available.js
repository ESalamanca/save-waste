import React from "react";
import UnitDonCard from "./UnitDonCard";
import donationServices from "./donationServices";
<<<<<<< HEAD
=======
import moment from 'moment';
>>>>>>> 6d7599dea33e346151e89185980f1b60dad9b737

class CarddonAvailable extends React.Component {
  state = {
    isOpen: false,
    statusDon: this.props.status
  };
  toggleCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  deleteDon = () => {
    donationServices.deleteDonation(this.props._id).then(donation => {
      this.props.fetchDonationsUser();
      //ici je voudrais refresh la page
    });
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
      this.props.fetchDonationsAvailable();
      this.props.history.push("/dashboard");
    });
  };

  render() {
    const cardHeading = {
      pending: "Panier Disponible",
      booked: "Panier Réservé",
      pickedUp: "Panier Récupéré"
    };
    const dateRecuperation = moment (this.props.pickDate).format('DD/MM/YY'); 
    //Le bouton pour les associations
    /*const cardButton = {
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
      pending: "Panier Disponible"
    };*/

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
            <div>
            A récupérer avant le : {dateRecuperation}
            {this.props.location}
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
