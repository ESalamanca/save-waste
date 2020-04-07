import React from "react";
import UnitDonCard from "./UnitDonCard";
import moment from "moment";

class CarddonPicked extends React.Component {
  state = {
    isOpen: false,
  };
  toggleCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const dateRecup = moment(this.props.updated_at).format("DD/MM/YY");

    return (
      <div className="historicview">
        <div className="card_dons">
          {!this.state.isOpen && (
            <div className="cardClosed">
              <img src="/Gift-Box.png" alt="Logo panier" />
              <p>
                Panier Récupéré{" "}
                {this.props.user.clientType === "restaurant"
                  ? `par ${
                      this.props.taker ? this.props.taker.companyName : ""
                    }`
                  : ""}
              </p>

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
                <p>
                  Panier Récupéré{" "}
                  {this.props.user.clientType === "restaurant"
                    ? `par ${
                        this.props.taker ? this.props.taker.companyName : ""
                      }`
                    : ""}
                </p>
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
                <div>Récupéré le : {dateRecup}</div>
              </div>
              <div className="placeRecup">
                <div>
                  <img src="/check-in.svg" alt="check-in " />
                </div>
                <div>{this.props.location}</div>
              </div>

              <button className="btn-download">
                Télécharger le certificat de don
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default CarddonPicked;
