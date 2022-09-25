import { Helmet } from 'react-helmet';

const Home = () => {
    // document.title = 'Home | RainWater Protocol';
    return (
      <div className="body">
        <Helmet>
          <title>Home | RainWater Protocol</title>
        </Helmet>    
        <h1 className="App-name">RainWater</h1>
        <h2 className="App-description">A fully decentralized social media protocol, backed by IPFS and smart contracts.</h2>
      </div>
    );
  };
  
  export default Home;
  