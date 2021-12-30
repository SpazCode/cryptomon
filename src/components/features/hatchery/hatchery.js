import "./hatchery.css";
import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import Blockchain from "../../libs/blockchain.js";
import _ from "lodash";
import Token from "../../abis/Token.json";

class Hatchery extends Component {
  constructor(props) {
    if (_.isEmpty(props.token)) {
      props.token = Blockchain.loadContract(Token);
    }
    super(props);
    this.state = {};
  }

  hatchNewMon() {
    this.props.token.mint().call();
  }

  hatchAnimation() {
    let egg = document.getElementById("hatching_egg_img");
    egg.style.animationPlayState = "running";
    egg.classList.add("egg_hatch_anim");
    egg.classList.remove("egg_sitting_anim");
    setTimeout(this.resetHatchAnimation(egg), 2500);
  }

  resetHatchAnimation(egg) {
    egg.classList.remove("egg_hatch_anim");
    egg.classList.add("egg_sitting_anim");
  }

  render() {
    return (
      <div id="hatchery" className="container-fluid">
        <div className="row text-center justify-content-center">
          <h2 className="text-center">Hatchery</h2>
        </div>
        <div id="hatching_monster" className="row">
          <div className="container">
            <div className="col-md-8 offset-md-2 justify-content-center">
              <img
                id="hatching_egg_img"
                src="/images/egg.svg"
                width="450"
                height="450"
                className="img-fluid egg_sitting_anim"
                alt=""
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 offset-md-4 justify-content-center">
              <ButtonGroup>
                <Button onClick={this.hatchAnimation}>Hatch</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div id="hatched_monster" className="row" hidden></div>
      </div>
    );
  }
}

export default Hatchery;
