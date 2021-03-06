import React from "react";
import moment from 'moment';

class UnitDonCard extends React.Component {
  render() {
    const foodTypes = {
      Fruits: "/apple.svg",
      Légumes: "/carrot.svg",
      Viandes: "/meet.svg",
      Divers: "/millenium-falcon.svg"
    };
    const expiration = moment(this.props.expirationDate).format('DD/MM/YY');
    

    return (
      <div className="cardInfo">

        <div className="productType">
            <div>Type</div>
            <div>
              <img src={foodTypes[this.props.productType]} alt="logo food" />
            </div>
          </div>

          <div className="productName"> 
          <div>Produit </div>
          <div className="grasDroite">{this.props.productName}</div>
          </div>

          <div className="productWeight">
            <div> Poids </div>
            <div className="grasDroite">{this.props.quantity.value}{" "}
            {" " + this.props.quantity.qtyType}</div>
          </div>

          <div className="productexpDate">
            <div>Péremption </div>
            <div className="grasDroite">{expiration}</div>
          </div>
      </div>
      
    );
  }
}

export default UnitDonCard;
