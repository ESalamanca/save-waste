import React from "react";

import authService from "./auth-service.js";
import { Link, Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Address from "./Address";

export default class extends React.Component {
  state = {
    address: "",
    error: ""
  };

  handleUpload = event => {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);

    authService.upload(formData).then(response => {
      this.props.updateUser(response);
    });
  };

  // updateAddress = address => {
  //   this.setState({
  //     user: {
  //       ...this.state.user
  //     }
  //   });
  // };

  render() {
    // console.log(this.props);
    return (
      <>
        {!this.props.user._id ? (
          <Redirect to="/" />
        ) : (
          <Formik
            initialValues={{
              companyName: this.props.user.companyName,
              clientType: this.props.user.clientType,
              contactName: this.props.user.contactName || "",
              email: this.props.user.email,
              phone: this.props.user.phone || "",
              siret: this.props.user.siret || "", //uniquement sociétés
              address: this.props.user.address || "",
              GeoLoc: this.props.user.GeoLoc || {},
              imageUrl: this.props.user.imageUrl || "",
              error: ""
            }}
            validationSchema={Yup.object({
              companyName: Yup.string()
                .max(30, "Doit contenir moins de 30 caractères")
                .required("Required"),
              email: Yup.string()
                .email("Adresse email non valide")
                .required("Required"),
              clientType: Yup.string()
                .oneOf(["association", "restaurant"], "Typologie invalide")
                .required("Required"),
              contactName: Yup.string().max(
                30,
                "Doit contenir moins de 30 caractères"
              ),
              siret: Yup.number()
            })}
            onSubmit={(values, { setSubmitting }) => {
              const {
                email,
                companyName,
                clientType,
                siret,
                contactName,
                address,
                GeoLoc,
                phone
              } = values;
              authService
                .edit({
                  clientType,
                  companyName,
                  email,
                  contactName,
                  address,
                  GeoLoc,
                  siret,
                  phone
                })
                .then(response => {
                  this.props.updateUser(response);
                  this.props.history.push("/profile");
                });
            }}
          >
            {({ values, setFieldValue }) => {
              const handleAddress = (address, GeoLoc) => {
                setFieldValue("address", address);
                setFieldValue("GeoLoc", GeoLoc);
              };
              console.log("values", values);
              return (
                <Form className="form">
                  <img
                    className="avatar"
                    src={
                      this.props.user.imageUrl ||
                      "https://material.io/tools/icons/static/icons/baseline-person-24px.svg"
                    }
                    alt="avatar"
                  />
                  <label for="file" class="label-file">
                    Choisir une image
                  </label>
                  <input
                    id="file"
                    name="imageUrl"
                    className="input-file"
                    type="file"
                    onChange={event => {
                      this.handleUpload(event);
                    }}
                  ></input>

                  <label htmlFor="clientType">Vous êtes?</label>
                  <Field name="clientType" as="select" className="my-select">
                    <option value=""></option>
                    <option value="association">Association</option>
                    <option value="restaurant">Restaurant</option>
                  </Field>

                  <ErrorMessage
                    component="span"
                    className="error"
                    name="clientType"
                  />

                  <label htmlFor="companyName">Raison Sociale</label>

                  <Field name="companyName" type="text" />

                  <ErrorMessage
                    component="span"
                    className="error"
                    name="companyName"
                  />

                  <label htmlFor="email">Email </label>

                  <Field name="email" type="email" />

                  <ErrorMessage
                    component="span"
                    className="error"
                    name="email"
                  />

                  <label htmlFor="contactName">Contact </label>

                  <Field name="contactName" type="text" />

                  <ErrorMessage
                    component="span"
                    className="error"
                    name="contactName"
                  />

                  <label>Adresse</label>

                  <Address
                    pushAddress={handleAddress}
                    address={values.address}
                  ></Address>

                  <label htmlFor="phone">Téléphone </label>

                  <Field name="phone" type="tel" />

                  {this.props.user.clientType === "restaurant" ? (
                    <>
                      <label htmlFor="siret">Siret </label>

                      <Field name="siret" type="number" />

                      <ErrorMessage
                        component="span"
                        className="error"
                        name="siret"
                      />
                    </>
                  ) : null}

                  <button className="btn">Enregistrer</button>
                </Form>
              );
            }}
          </Formik>
        )}
      </>
    );
  }
}
