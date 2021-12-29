import React, { Component } from "react";
import "./hatchery.css"

class Hatchery extends Component {
  render() {
    return (
      <div id="hatchery" className="container">
        <div className="row text-center">
          <h1>Hatchery</h1>
        </div>
        <div id="hatching_monster" className="row">
          <div className="col-md-8-offset-md-2 text-center">
          <img
              src="/images/egg.svg"
              width="450"
              height="450"
              className="rounded img-thumbnail"
              alt=""
            />
          </div>
        </div>
        <div id="hatched_monster" className="row" hidden></div>
      </div>
    );
  }
}

export default Hatchery;
