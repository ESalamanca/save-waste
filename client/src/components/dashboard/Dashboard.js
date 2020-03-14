import React from "react";
import Kpi from "./Kpi.js"; 
//import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  render(){
    return(
      <div className="dashboard">
      <Kpi 
      amount={this.props.amount}
      donsDone={this.props.donsDone}
      nbmealsGiven={this.props.nbmealsGiven}
      emissionsCO2={this.props.emissionsCO2}
      donsonGoing={this.props.donsonGoing}/>
      </div>
    )
  }
}
export default Dashboard; 