import React from "react";

class KpiBottom extends React.Component {
  render() {
    return (
      <div>
        <div className="Kpi3">
          <h2>Vos données</h2>
          <p>
            <img src="/icon_bullet1.svg" alt="Logo" />
            {this.props.donsDone.length} Dons réalisés
          </p>
          <p>
            <img src="/icon_bullet2.svg" alt="Logo" />
            {this.props.nbmealsGiven} Personnes bénéficiaires
          </p>
          <p>
            <img src="/icon_bullet3.svg" alt="Logo" />
            {this.props.emissionsCO2} C02 Emissions CO2 évitées
          </p>
        </div>
      </div>
    );
  }
}
export default KpiBottom;
