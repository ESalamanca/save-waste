import React from "react";

import { Link, Redirect } from "react-router-dom";

export default props => {
  return (
    <>
      {props.user._id ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="container">
          <p>
            Faites de vos surplus des dons et économisez de l’argent avec
            SaveWaste
          </p>

          <div className="cta">
            <Link className="btn" to="/signup">
              Sign up
            </Link>
            <Link className="btn" to="/login">
              Log in
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
