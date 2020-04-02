import React from "react";
import CarddonPicked from "../dons/Card_picked.js"; 
class Historicview extends React.Component {

  componentDidMount = () => {
    this.props.getCurrentPageName("Historique");
  };

    render(){
      return(
        <div className="card_dons">
          <CarddonPicked/>  
        </div>
       
      )
    }
  }
  export default Historicview; 