import "./app.css";
import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import Token from "../abis/Token.json";
import hatch from "../hatch.png";
import Hatchery from "./features/hatchery/hatchery";
import Blockchain from "./libs/blockchain";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      token: {},
      totalSupply: null,
    };
  }

  async componentDidMount() {
    await Blockchain.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const accounts = await Blockchain.getCurrentAccounts();
    this.setState({ account: accounts[0] });
    const token = await Blockchain.loadContract(Token);
    if (!_.isNull(token)) {
      this.setState({ token });
      const totalSupply = await token.methods.getTotalSupply().call();
      this.setState({ totalSupply });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={hatch}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            &nbsp; CryptoMon
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-muted">
                <span id="account">{this.state.account}</span>
              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1 className="d-4">Welcome to the Monster Farm!</h1>
                <div className="row justify-content-center">
                  <ButtonGroup>
                    <Button>Hatchery</Button>
                    <Button>Nursery</Button>
                    <Button>Battle Ring</Button>
                    <Button>Item Shop</Button>
                  </ButtonGroup>
                </div>
                <div id="screen" className="row justify-content-center">
                  <Hatchery token={this.state.token} />
                  {/** Nursery */}
                  {/** The Ring */}
                  {/** Item shop */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
