import React from "react";

class KpiBottom extends React.Component {
  render() {

  const bottom1 = this.props.user && this.props.user.clientType === "restaurant"
  ?  "réalisés"
  :  "récupérés";



    return (
      <div>
        <div className="Kpi3">
          <h2 className="titreKpi3">Vos données</h2>
          <p>
            <img src="/icon_bullet1.svg" alt="Logo" />
            {this.props.donsDone.length} dons {bottom1}
          </p>
          <p>
            <img src="/icon_bullet2.svg" alt="Logo" />
            {this.props.nbmealsGiven} personnes bénéficiaires
          </p>
          <p>
            <img src="/icon_bullet3.svg" alt="Logo" />
            {this.props.emissionsCO2}kg d'émissions de CO2 évités
          </p>
        </div>
      </div>
    );
  }
}
export default KpiBottom;
