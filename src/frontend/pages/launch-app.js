import { Button } from 'react-bootstrap';

const Launch_App = () => {
    function refreshPage() {
      window.location.reload(false);
    }
    document.title = 'App | RainWater Protocol';
    return (
      <div className="body2">
        <div className="Top-bar">
          <h1 className="App-name-2" onClick={refreshPage}>RainWater</h1>
          <button className="Wallet-button">Connect Wallet</button>
        </div>
        <div className="Upload">
          <h2 className="Image-upload">Share Image</h2>
          <button className="Upload-button">Choose File</button>
          <input type="text" name="Description" placeholder="Image Description .." />
          <button className="Post">Upload</button>
        </div>
      </div>
    );
  };
  
export default Launch_App;
  