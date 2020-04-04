import React from "react";

class KpiTop extends React.Component {
  render() {

    const euroSign = this.props.user && this.props.user.clientType === "restaurant"
      ? <span className="euro">€</span> : '';
    const bigNumber = this.props.user && this.props.user.clientType === "restaurant"
    ?  this.props.amount
    :  this.props.donationsAvailable;

    const wordingKpi = this.props.user && this.props.user.clientType === "restaurant"
    ?  "d’impôt économisés"
    :  "dons disponibles";

    const wordingKpi2 = this.props.user && this.props.user.clientType === "restaurant"
    ?  "dons en cours"
    :  "dons réservés";


    return (
      <div>

       <div className="Kpi1">
          <span className="amount">{bigNumber}{euroSign}</span>
          <div className="wording">{wordingKpi}</div>
        </div>

        <div className="Kpi2">
          <p>⬇️{this.props.nbDonsOnGoing} {wordingKpi2} 😍</p>
        </div>
      </div>
    );
  }
}
export default KpiTop;


