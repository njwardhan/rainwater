import { Helmet } from 'react-helmet';

const Ecosystem = () => {
    document.title = 'Ecosystem | RainWater Protocol';
    return (
        <div
            className="Ecosystem"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'white'
            }}
        >
            <Helmet>
              <title>Ecosystem | RainWater Protocol</title>
            </Helmet>
            <h1>Ecosystem</h1>
        </div>
    );
};

export default Ecosystem;
