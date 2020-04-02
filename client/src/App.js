import React, { Component } from "react";
import "./App.scss";

import { Switch, Route } from "react-router-dom";

import Homepage from "./components/auth/Homepage.js";
import Signup from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js";
import Profile from "./components/auth/Profile.js";
import ProfileEdit from "./components/auth/ProfileEdit.js";
import Address from "./components/auth/Address.js";
import Navbar from "./components/navigation/Navbar";
import MenuBar from "./components/navigation/MenuBar";
import DonationForm from "./components/dons/DonationForm";
import ListDons from "./components/dons/ListDons.js";
import authService from "./components/auth/auth-service.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import Historic from "./components/auth/Historic.js";

class App extends Component {
  state = {
    user: {},
    terminatedDons: [],
    pendingDons: [],
    listDons: [],
    currentPageName: "SaveWaste",
    listDonsRestaurant: []
  };

  getCurrentPageName = currentPageName => {
    this.setState({ currentPageName });
  };

  fetchUser = () => {
    if (!this.state.user._id) {
      authService
        .loggedin()
        .then(data => this.setState({ user: data }))
        .catch(err => this.setState({ user: {} }));
    } else {
      console.log("user already in the state");
    }
  };

  updateUser = data => {
    this.setState({ user: data });
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    console.log(this.state.user);
    return (
      <div className="App">
        <Navbar
          user={this.state.user}
          currentPageName={this.state.currentPageName}
        />
        <Route
          render={props => (
            <div className="App" data-route={props.location.pathname}>
              {" "}
              {/* data-route="/" allow us to style pages */}
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Homepage user={this.state.user} />}
                />

                <Route
                  exact
                  path="/signup"
                  render={props => (
                    <Signup
                      updateUser={this.updateUser}
                      history={props.history}
                    />
                  )}
                />

                <Route
                  exact
                  path="/login"
                  render={props => (
                    <Login
                      updateUser={this.updateUser}
                      history={props.history}
                    />
                  )}
                />

                <Route
                  exact
                  path="/profile"
                  render={props => (
                    <Profile
                      user={this.state.user}
                      updateUser={this.updateUser}
                      history={props.history}
                    />
                  )}
                />
                <Route
                  exact
                  path="/profile/edit"
                  render={props => (
                    <ProfileEdit
                      user={this.state.user}
                      updateUser={this.updateUser}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/new-donation"
                  render={props => {
                    if (this.state.user.clientType === "restaurant") {
                      return (
                        (this.state.user.address === "" ||
                          this.state.user.address) && (
                          <DonationForm user={this.state.user} {...props} />
                        )
                      );
                    } else {
                      return <ListDons user={this.state.user} {...props} />;
                    }
                  }}
                />

                <Route exact path='/edit/:donationID' render ={props =>{
                  if (this.state.user.clientType === "restaurant") {
                    return (
                        <DonationEdit user={this.state.user} {...props} />
                      )
                    );
                }}}/>

                <Route
                  exact
                  path="/available-donation"
                  render={props => {
                    if (this.state.user.clientType === "association") {
                      return <ListDons user={this.state.user} {...props} />;
                    } else {
                      return <ListDons user={this.state.user} {...props} />;
                    }
                  }}
                />

                <Route
                  exact
                  path="/address"
                  render={props => (
                    <Address
                      user={this.state.user}
                      updateUser={this.updateUser}
                      {...props}
                    />
                  )}
                />

                <Route
                  exact
                  path="/dashboard"
                  render={props =>
                    this.state.user._id && (
                      <Dashboard user={this.state.user} {...props} />
                    )
                  }
                />
                <Route
                  exact
                  path="/historic"
                  render={props =>
                    this.state.user._id && (
                      <Historic user={this.state.user} {...props} />
                    )
                  }
                />

                {/* last route, ie: 404 */}
                <Route render={() => <h1>Not Found</h1>} />
              </Switch>
            </div>
          )}
        />
        {this.state.user._id && <MenuBar user={this.state.user} updateUser={this.updateUser} />}
      </div>
    );
  }
}

export default App;
