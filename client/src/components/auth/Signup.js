import React from "react";

import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import authService from "./auth-service.js";

export default class extends React.Component {
  componentDidMount = () => {
    this.props.getCurrentPageName("SaveWaste");
  };

  render() {
    return (
      <Formik
        initialValues={{
          clientType: "",
          companyName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          error: "",
        }}
        validationSchema={Yup.object({
          companyName: Yup.string()
            .max(30, "Doit contenir moins de 30 caractères")
            .required("Required"),
          password: Yup.string().min(8, "Doit contenir au moins 8 caractères"),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Les mots de passe doivent concorder"
          ),
          email: Yup.string()
            .email("Adresse email non valide")
            .required("Required"),
          clientType: Yup.string()
            .oneOf(["association", "restaurant"], "Typologie invalide")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const { email, companyName, clientType, password } = values;
          console.log("values", values);
          authService
            .signup(email, password, companyName, clientType)
            .then((response) => {
              this.props.updateUser(response);
              setSubmitting(false);
              this.props.history.push("/");
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="form">
              <h1>Créez votre compte</h1>
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

              <ErrorMessage component="span" className="error" name="email" />

              <label htmlFor="password">Mot de passe </label>

              <Field name="password" type="password" />

              <ErrorMessage
                component="span"
                className="error"
                name="password"
              />

              <label htmlFor="passwordConfirmation">
                Confirmation du mot de passe{" "}
              </label>

              <Field name="passwordConfirmation" type="password" />

              <ErrorMessage
                component="span"
                className="error"
                name="passwordConfirmation"
              />

              <button className="btn">Créer mon compte</button>
              <p>
                Vous avez déjà un compte ? <Link to="/login">Me connecter</Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
