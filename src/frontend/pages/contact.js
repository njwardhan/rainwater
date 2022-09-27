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
           <h2>“A man may die, nations may rise and fall, but an idea lives on.” ~ John F. Kennedy“</h2> 
        </div>
    );
};

export default Contact;