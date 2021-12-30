import Web3 from "web3";
import _ from "lodash";

class Blockchain {
  static async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.Web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected");
    }
  }

  static async getCurrentAccounts() {
    const web3 = window.web3;
    console.assert(!_.isEmpty(web3));
    const accounts = await web3.eth.getAccounts();
    return accounts;
  }

  static async loadContract(tokenAbi) {
    const web3 = window.web3;
    console.assert(!_.isEmpty(web3));
    const networkId = await web3.eth.net.getId();
    const networkData = tokenAbi.networks[networkId];
    if (networkData) {
      const address = networkData.address;
      const abi = tokenAbi.abi;
      return new web3.eth.Contract(abi, address);
    } else {
      window.alert("The Contract is not deployed to the network.");
      return null;
    }
  }
}

export default Blockchain;
