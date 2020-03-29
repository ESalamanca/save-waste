import React from "react";

import { Link } from "react-router-dom";
import Bell from "./Bell.js";

export default props => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src="./saveWaste_icon2.png" alt="LOGO" />
      </Link>
      <h1>{props.currentPageName}</h1>
      <Bell user={props.user} />
    </nav>
  );
};
