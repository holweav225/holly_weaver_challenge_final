import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/globals.css";
const API_KEY = `${process.env.REACT_APP_BREWERYDB_API_KEY}`;
const axios = require("axios");

class BreweryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numResults: "0",
      breweries: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/breweries/?key=${API_KEY}&withLocations=Y`
      )
      .then(res =>
        this.setState({
          numResults: res.data.totalResults,
          breweries: res.data.data,
          isLoading: false
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
    const { isLoading } = this.state;

    return (
      <div className="col-sm-8">
        <div className="brewery-name">
          <span>{this.state.numResults} Brewery Locations Found</span>
        </div>
        {!isLoading ? (
          this.state.breweries.map(breweries => {
            return (
              <table className="table table-striped" key={breweries.id}>
                {typeof breweries.locations == "object" ? (
                  <tbody>
                    {breweries.locations.map(locations => (
                      <tr key={locations.id}>
                        <td>
                          <div className="brewery">
                            {typeof breweries.images == "object" ? (
                              <img
                                className="pull-left brewery-image"
                                src={breweries.images.icon}
                                alt={breweries.name}
                              />
                            ) : (
                              <div className="pull-left brewery-image" />
                            )}
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="brewery-info" />
                            <div className="brewery-name truncate">
                              <Link
                                to={{
                                  pathname: "/brewerydetails",
                                  state: {
                                    id: locations.id
                                  }
                                }}
                              >
                                {breweries.name}
                              </Link>
                            </div>
                            <div className="brewery-producer truncate">
                              {locations.streetAddress}
                            </div>
                            <div className="brewery-producer truncate">
                              {locations.locality}, {locations.region}{" "}
                              {locations.postalCode}
                            </div>
                            <div className="brewery-style truncate">
                              <a href={breweries.website} target="_blank">
                                {breweries.website}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="brewery-producer margin-bottom 10px">
                            {locations.name} -{" "}
                            {locations.locationType == "micro"
                              ? "Micro Brewery"
                              : locations.locationType == "macro"
                              ? "Macro Brewery"
                              : locations.locationType == "brewpub"
                              ? "Brewpub"
                              : locations.locationType == "production"
                              ? "Production Facility"
                              : locations.locationType == "office"
                              ? "Office"
                              : locations.locationType == "tasting"
                              ? "Tasting Room"
                              : locations.locationType == "restaurant"
                              ? "Restaurant/Ale House"
                              : locations.locationType == "cidery"
                              ? "Cidery"
                              : locations.locationType == "meadry"
                              ? "Meadry"
                              : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : null}
              </table>
            );
          })
        ) : (
          <div>
            <div>No Data</div>
          </div>
        )}
      </div>
    );
  }
}

export default BreweryList;
