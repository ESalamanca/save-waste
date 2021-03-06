import React from "react";
import authService from "./../auth/auth-service";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    backgroundColor: "#F7DC00",
    color: "#FFFFFF",
  },
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

function MenuBar(props) {
  const classes = useStyles();
  const url =
    props.user && props.user.clientType === "restaurant"
      ? "/new-donation"
      : "/available-donation";
  console.log(props);
  console.log("this is url ", url);

  const imgButton =
    props.user && props.user.clientType === "restaurant" ? (
      <AddIcon />
    ) : (
      <img src="zoom2.png" alt="to dashboard" className="loupe" />
    );

  const handleLogout = () => {
    authService
      .logout()
      .then((response) => {
        props.updateUser({});
        props.getCurrentPageName("SaveWaste");
        props.history.push("/");
      })
      .catch(console.error);
  };

  return (
    <React.Fragment>
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="primary"
          className={classes.appBar}
          classes={{ root: classes.root }}
        >
          <Toolbar className="buttons">
            <Link to={url}>
              <Fab className={classes.fabButton}>{imgButton}</Fab>
            </Link>

            <div className="menu">
              <div className="iconMenu">
                <Link to="/dashboard" className="buttons">
                  <img src="icon_dash.svg" alt="to dashboard" />{" "}
                </Link>
              </div>
              <div className="iconMenu">
                <Link to="/historic" className={classes.buttons}>
                  <img src="icon_historic.svg" alt="to historic" />{" "}
                </Link>
              </div>
              <div className="iconMenu">
                <Link to="/profile" className={classes.buttons}>
                  <img src="icon_profil.svg" alt="to profil" />{" "}
                </Link>
              </div>
              {/* TODO ajouter un menu ouvrant qui permet d'accéder à la deconnexion mais à d'autres 
              éléments aussi... pour l'instant on deco directement avec une icone pas très parlante */}
              <div className="iconMenu">
                <img
                  className={classes.buttons}
                  onClick={handleLogout}
                  src="/deco.svg"
                  alt="deco"
                />{" "}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}

export default MenuBar;
