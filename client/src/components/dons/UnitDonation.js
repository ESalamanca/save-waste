import React from "react";

import { Field } from "formik";


class UnitDonation extends React.Component {
  render() {
    return (
      <>
        <div className="headUnitDon">
          <h2>Produit à donner </h2>
          <img
            src="/delete.svg"
            onClick={() => this.props.deleteUnitDon(this.props.index)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="produit">
          <Field
            name={`donationBox.${this.props.index}.productName`}
            type="text"
            placeholder="Nom du produit"
          ></Field>

          <Field
            name={`donationBox.${this.props.index}.productType`}
            as="select"
          >
            <option value="Légumes">Légumes</option>
            <option value="Fruits">Fruits</option>
            <option value="Viande">Viande</option>
            <option value="Divers">Divers</option>
          </Field>
        </div>

        <div className="quantity">
          <label>Quantité</label>
          <div className="input-quantity">
            <Field
              name={`donationBox.${this.props.index}.quantity.value`}
              type="number"
            ></Field>
            <Field
              name={`donationBox.${this.props.index}.quantity.qtyType`}
              as="select"
            >
              <option value="kg">kg</option>
              <option value="qty">items</option>
            </Field>
          </div>
        </div>
        <div className="date">
          <label>Date d'expiration</label>
          <Field
            type="date"
            name= {`donationBox.${this.props.index}.expirationDate`}
          ></Field>
        </div>
      </>
    );
  }
}

export default UnitDonation;
