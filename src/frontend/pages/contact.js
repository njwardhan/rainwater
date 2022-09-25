import { Helmet } from 'react-helmet';

const Contact = () => {
    // document.title = 'Contact | RainWater Protocol';
    return (
        <div
            className="Contact"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color:'white'
            }}
        >
            <Helmet>
              <title>Contacts | RainWater Protocol</title>
            </Helmet>
           <h1>Contact Us</h1> 
        </div>
    );
};

export default Contact;