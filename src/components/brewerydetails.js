import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/globals.css";
import GoogleMapReact from "google-map-react";

const API_KEY = `${process.env.REACT_APP_BREWERYDB_API_KEY}`;
const MyGOOGLE_API_KEY = `${process.env.MyGOOGLE_API_KEY}`;
const axios = require("axios");

const AnyReactComponent = ({ text }) => (
  <div>
    <div>
      <img src={text} width="20" />
    </div>
  </div>
);

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 15,
      location: {},
      isLoading: true,
      markers: []
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state;

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/location/${id}/?key=${API_KEY}`
      )
      .then(res =>
        this.setState({
          location: res.data.data,
          isLoading: false,
          markers: [
            {
              lat: res.data.latitude,
              lng: res.data.longitude,
              img_src: "map-marker-icon.jpg"
            }
          ]
        })
      )
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }

  render() {
    let detail = this.state.location;
    const { isLoading } = this.state;

    return (
      <div className="">
        <div>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="row">
              <div className="card col-7 offset-3">
                <div className="card-body bg-light">
                  <dl className="text-align-center">
                    <dd className="card-title brewery-name">
                      {detail.brewery.name}
                    </dd>
                    <dd className="card-text">{detail.streetAddress}</dd>
                    <dd className="card-text">
                      {detail.locality}, {detail.region} {detail.postalCode}
                    </dd>
                  </dl>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-secondary align-self-center p-2"
                      onClick={() => this.props.history.goBack()}
                    >
                      BACK TO LIST
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="card col-7  offset-3" style={{ height: "70vh" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA4D03B6F2cW4be8rQsPFH0defvUCPkLSI"
            }}
            center={{ lat: detail.latitude, lng: detail.longitude }}
            zoom={this.state.zoom}
          >
            {this.state.markers.map((marker, i) => {
              return (
                <AnyReactComponent
                  lat={marker.lat}
                  lng={marker.lng}
                  text={marker.img_src}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default SimpleMap;
