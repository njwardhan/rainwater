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
            <h1>Community</h1>
        </div>
    );
};

export default Community;
