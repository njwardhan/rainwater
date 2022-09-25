import { Helmet } from 'react-helmet';

const Faq = () => {
    // document.title = 'FAQ | RainWater Protocol';
    return (
        <div
            className="FAQ"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'white'
            }}
        >
            <Helmet>
              <title>FAQ | RainWater Protocol</title>
            </Helmet> 
            <h1>FAQ</h1>
        </div>
    );
};

export default Faq;
