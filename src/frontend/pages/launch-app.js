import React, { Component } from 'react';
import RainWaterAbi from '../contractsData/rainwater.json';
import RainWaterAddress from '../contractsData/rainwater-address.json';
import axios from 'axios';
import Identicon from 'identicon.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
const FormData = require('form-data');
const { ethers } = require("ethers");

// document.title = 'App | RainWater Protocol';

class Launch_App extends Component {
  async componentDidMount() {
    await this.loadContract();
  }

  async loadContract() {
    // console.log("contract loaded")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const { chainId } = await provider.getNetwork()
    // console.log(chainId);
    // console.log(window.ethereum.networkVersion)
    const signer = provider.getSigner();
    // console.log(await signer.getAddress());
    const acc = await signer.getAddress();
    this.setState({ account: acc });
    const contract = new ethers.Contract(RainWaterAddress.address, RainWaterAbi.abi, signer)
    this.setState({ rainwater: contract });
    // console.log(contract.address);
    const count = await contract.functions.imageCount();
    // console.log(parseInt(count));

    // Load Images
    let copy = [];
    for (var i = 1; i <= count; i++) {
      const image = await contract.functions.images(i);
      copy.push(image);
      this.setState({ images: copy });
    }

    // Sort images as per the tip
    this.setState({ images: this.state.images.sort((a, b) => b.tipAmount - a.tipAmount) });

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
  sendFileToIPFS = async (description) => {
    console.log("Submitting file to ipfs...")
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const formData = new FormData();
    formData.append("file", this.state.buffer);
    console.log("Image Description:", description)

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
    ).then(async response => {
      // Response handled
      // console.log(response);
      console.log('Retrieved IPFS hash:', response.data.IpfsHash);
      this.setState({ loading: true });
      const hope = await this.state.rainwater.functions.uploadImage(response.data.IpfsHash, description);
      console.log(hope)
      this.setState({ loading: false });
      window.location.reload();
    }).catch(function (error) {
      // Error handled
      console.log(error)
    });
  };

  // Tip the image owner for their post
  tipImageAuthor = async (id, tipAmount) => {
    this.setState({ loading: true });
    await this.state.rainwater.functions.tipImageAuthor(id, { value: ethers.utils.parseEther(tipAmount) });
    this.setState({ loading: false });
    window.location.reload();
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      rainwater: null,
      images: [],
      loading: true,
      buffer: null
    }
    this.captureFile = this.captureFile.bind(this)
    this.sendFileToIPFS = this.sendFileToIPFS.bind(this)
  }

  render() {
    return (
      <div className="columns">
        <Helmet>
          <title>App | RainWater Protocol</title>
        </Helmet>
        <div className="column">
          <div className="Uploader">
            {this.state.loading
              ? <div id="loader" className='text center mt-5'><p>Loading...</p></div>
              : <div className='items'>
                <h2 style={{ color: "black" }}>Share Image</h2>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const description = this.imageDescription.value
                  // this.uploadImage(description)
                  this.sendFileToIPFS(description)
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
          </div>
        <div className="column">
          <div className='Main-content'>
            {this.state.images.map((image, key) => {
              return (
                <div className="card mb-4" key={key} >
                  <div className="card-header">
                    <img
                      className='mr-2'
                      width='30'
                      height='30'
                      src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <small className="text-muted">{image.author}</small>
                  </div>
                  <ul id="imageList" className="list-group list-group-flush">
                    <li className="list-group-item">
                      <p className="text-center"><img src={`https://gateway.pinata.cloud/ipfs/${image.hash}`} style={{ maxWidth: '420px' }} /></p>
                      <p>{image.description}</p>
                    </li>
                    <li key={key} className="list-group-item py-2">
                      <small className="float-left mt-1 text-muted">
                        Total Tipped Amount: {ethers.utils.formatEther(image.tipAmount.toString(), 'Ether')} ETH
                      </small>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="btn btn-link btn-sm float-right pt-0"
                        name={image.id}
                        onClick={(event) => {
                          let tipAmount = ethers.utils.formatEther('100000000000000000', 'wei');
                          console.log(event.target.name, tipAmount)
                          this.tipImageAuthor(event.target.name, tipAmount)
                        }}
                      >
                        TIP 0.1 ETH
                      </button>
                    </li>
                  </ul>
                </div>
                )
              })}
            </div>
          </div>
        <div className="column">
          <p style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '30px',
            }}>
            *images might take some time to show up
          </p>
        </div>
      </div>

      // <div className="container-fluid-mt-5">
      //   <div className="row">
      //     <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
      //       <div className="content mr-auto ml-auto">
      //       </div>
      //     </main>
      //   </div>
      // </div >
    );
  }
};

export default Launch_App;
