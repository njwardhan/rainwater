import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
const { ethers } = require("ethers");

document.title = 'App | RainWater Protocol';
function refreshPage() {
  window.location.reload(false);
}

class Launch_App extends Component {
    async componentDidMount() {
      await this.web3Handler();
      await this.loadContract();
    }
  
    async web3Handler() {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log(provider.provider.selectAddress)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner();
      // console.log("Account:", await signer.getAddress())
      this.setState({ account: signer.getAddress() });
    }

    async loadContract() {
      // const signer = await ethers.getSigner();
      // Get deployed copy of the contract
      // const contract = new ethers.Contract(MusicNFTMarketplaceAddress.address, MusicNFTMarketplaceAbi.abi, signer)
    }

    constructor(props) {
      super(props)
      this.state = {
        account: '',
      }
    }

    render() {
      return (
        <div className="body2">
          <div className="Upload">
            <h2 className="Image-upload">Share Image</h2>
            <button className="Upload-button">Choose File</button>
            <input type="text" name="Description" placeholder="Image Description .." />
            <button className="Post">Upload</button>
          </div>
        </div>
      );
    }
  };
  
export default Launch_App;
  