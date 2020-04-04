import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import moment from "moment";
import RoomIcon from "@material-ui/icons/Room";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Map
          donations={this.props.donations}
          style={{
            minWidth: "200px",
            minHeight: "100px",
            maxWidth: "100%",
            maxHeight: "300px",
            width: "400px",
            height: "400px"
          }}
          initialCenter={{
            lat: 48.87,
            lng: 2.333333
          }}
          google={this.props.google}
          zoom={11}
        >
          {this.props.donations &&
            this.props.donations.map(donation => {
              return (
                <Marker
                  key={donation._id}
                  onClick={this.onMarkerClick}
                  icon={RoomIcon}
                  name={donation.giver.companyName}
                  pickDate={
                    donation.pickDate
                      ? moment(donation.pickDate).format("DD/MM/YY")
                      : ""
                  }
                  placeId={donation._id}
                  position={{
                    lat: donation.GeoLoc.lat,
                    lng: donation.GeoLoc.lng
                  }}
                />
              );
            })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            className="googleInfo"
          >
            <div className="Info">
              <h1
                onClick={() => {
                  console.log("clicked");
                  // this.props.toggleCard(this.state.selectedPlace.placeId);
                }}
              >
                {this.state.selectedPlace.name}
              </h1>
              <h2>Take before: {this.state.selectedPlace.pickDate}</h2>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "fr"
})(MapContainer);
