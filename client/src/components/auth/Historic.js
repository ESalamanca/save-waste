import React from "react";
import CarddonPicked from "../dons/Card_picked.js";
import donationServices from "../dons/donationServices";

class Historicview extends React.Component {

  // componentDidMount = () => {
  //   this.props.getCurrentPageName("Historique");
  // };

  //   render(){
  //     return(
  //       <div className="card_dons">
  //         <CarddonPicked/>  
  //       </div>
       
  //     )
  // TODO 

  state = {
    donations: []
  };

  fetchDonationsUser = () => {
    if (this.props.user.clientType === "restaurant") {
      this.fetchDonationsRestaurant();
    } else {
      this.fetchDonationsAssociation();
    }
  };
  fetchDonationsRestaurant = () => {
    donationServices
      .getDonationsGiver()
      .then(data => this.setState({ donations: data }))
      .catch(err => this.setState({ donations: {} }));
  };

  fetchDonationsAssociation = () => {
    donationServices
      .getDonationsAssociation()
      .then(data => this.setState({ donations: data }))
      .catch(err => this.setState({ donations: {} }));
  };

  componentDidMount = () => {
    this.fetchDonationsUser();
  };

  render() {
    const donsDone = this.state.donations.filter(
      don => don.status === "pickedUp"
    );

    return (
      <div className="dashboard">
        {donsDone.map(don => (
          <CarddonPicked
            key={don._id}
            fetchDonationsUser={this.fetchDonationsUser}
            user={this.props.user}
            history={this.props.history}
            {...don}
          />
        ))}
      </div>
    );
  }
}
export default Historicview;
