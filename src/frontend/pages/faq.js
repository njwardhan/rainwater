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
            <h2>“If you win, you need not have to explain... If you lose, you should not be there to explain!” ~ Adolf Hitler</h2>
        </div>
    );
};

export default Faq;
