import React, { Component } from 'react';
import RainWaterAbi from '../contractsData/rainwater.json';
import RainWaterAddress from '../contractsData/rainwater-address.json';
import axios from 'axios';
const FormData = require('form-data');
const { ethers } = require("ethers");

document.title = 'App | RainWater Protocol';

class Launch_App extends Component {
    async componentDidMount() {
      await this.loadContract();
    }

    async loadContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      // console.log(await signer.getAddress());
      const contract = new ethers.Contract(RainWaterAddress.address, RainWaterAbi.abi, signer)
      this.setState({ rainwater: contract });
      const imageCount = await contract.functions.imageCount;
      // console.log(imageCount.length);
      // console.log(this.state.rainwater);
      this.setState({ loading: false });
    }

    // Function to accept the file selected by the user
    captureFile = event => {
      event.preventDefault()
      const fileImg = event.target.files[0]
      this.setState({ buffer: fileImg }, () => {
        console.log("File to be uploaded:" + this.state.buffer);
      });
    }

    // Function to upload the image on to IPFS
    sendFileToIPFS = async() => {
      console.log("Submitting file to ipfs...")
      const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
      const formData = new FormData();
      formData.append("file", this.state.buffer);

      return axios.post(
        url,
        formData,
        {
            maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: 
            {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`
            }
        }
      ).then(function (response) {
        //handle response here
        console.log(response);
      }).catch(function (error) {
        //handle error here
        console.log(error)
    });
  };


    constructor(props) {
      super(props)
      this.state = {
        rainwater: null,
        images: [],
        loading: true,
        buffer: null,
      }
      // this.captureFile = this.captureFile.bind(this)
    }

    render() {
      return (

        <div className="Uploader">
          {this.state.loading
            ? <div id="loader" className='text center mt-5'><p>Loading...</p></div>
            : <div className='items'>
                <h2 style={{color: "black"}}>Share Image</h2>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const description = this.imageDescription.value
                  // this.uploadImage(description)
                  this.sendFileToIPFS()
                }} >
                  <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.captureFile} />
                    <div className="form-group mr-sm-2">
                      <br></br>
                        <input
                          id="imageDescription"
                          type="text"
                          ref={(input) => { this.imageDescription = input }}
                          className="form-control"
                          placeholder="Image description..."
                          required />
                    </div>
                  <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
                </form>
            </div>
          }
        </div>
      );
    }
  };
  
export default Launch_App;
  