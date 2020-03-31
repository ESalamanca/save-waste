import React from "react";

class UnitDonCard extends React.Component {
  render() {
    const foodTypes = {
      fruits: "/carrot.svg",
      Légumes: "/carrot.svg",
      viandes: "/carrot.svg",
      divers: "/carrot.svg"
    };

    return (
      <div className="cardInfo">
        <div>
          <div>Produit: {this.props.productName}</div>
          <div className="productType">
            Type: {this.props.productType}
            <div>
              <img src={foodTypes[this.props.productType]} alt="food type" />
            </div>
          </div>
          <div>
            Poids: {this.props.quantity.value}{" "}
            {" " + this.props.quantity.qtyType}
          </div>
          <div>
            Date de peremption: {this.props.expirationDate.split("T")[0]}
          </div>
        </div>
      </div>
    );
  }
}

export default UnitDonCard;
