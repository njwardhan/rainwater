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
            <h2>"In war, truth is the first casualty." ~ Aeschylus</h2>
        </div>
    );
};

export default Ecosystem;
