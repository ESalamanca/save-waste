import React from "react";
import CarddonBooked from "../dons/Card_booked.js";
import CarddonAvailable from "../dons/Card_available.js";

class Kpi extends React.Component {
  render() {
    return (
      <div>
        <div className="Kpi1">
          <span>{this.props.amount}</span>
          <span className="cashSave">€</span>
          <div className="bigKPI"> d'impôt économisés</div>
        </div>
        <div className="Kpi2">
          <span> ⬇️{this.props.donsonGoing} dons en cours 😍</span>
        </div>

        <CarddonBooked />
        <CarddonAvailable />

        <div className="Kpi3">
          <h2>Vos données</h2>
          <p>
            <img src="/icon_bullet1.svg" alt="Logo" />
            {this.props.donsDone}Dons réalisés
          </p>
          <p>
            <img src="/icon_bullet2.svg" alt="Logo" />
            {this.props.nbmealsGiven}Personnes bénéficiées
          </p>
          <p>
            <img src="/icon_bullet3.svg" alt="Logo" />
            {this.props.emissionsCO2}C02 Emissions CO2 évitées
          </p>
        </div>
      </div>
    );
  }
}
export default Kpi;
