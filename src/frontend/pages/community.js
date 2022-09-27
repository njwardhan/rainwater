import { Helmet } from 'react-helmet';

const Community = () => {
    // document.title = 'Community | RainWater Protocol';
    return (
        <div
            className="Community"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'white'
            }}
        >
            <Helmet>
              <title>Community | RainWater Protocol</title>
            </Helmet>
            <h2>"50,000 people used to live here, now it is a ghost town.” ~ Cpt. MacMillan</h2>
        </div>
    );
};

export default Community;
