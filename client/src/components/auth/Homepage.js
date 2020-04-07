import React from "react";

import { Link, Redirect } from "react-router-dom";

export default props => {
  return (
    <>
      {props.user._id ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="container">
          <div className="slogan">
            Faites de vos surplus des dons et économisez de l’argent avec
            SaveWaste
          </div>
          <div><img src="legumes_top.jpg" alt="legumes"/></div>
          <div className="cta">
            <Link className="btn" to="/signup">
              Sign up
            </Link>
            <Link className="btn" to="/login">
              Log in
            </Link>
          </div>
          {/*<div className="deco">
          <img src="resto.jpg" alt="resto"/>
          <img src="assos.jpg" alt="asso"/>
          </div>*/}
          
        </div>
      )}
    </>
  );
};
