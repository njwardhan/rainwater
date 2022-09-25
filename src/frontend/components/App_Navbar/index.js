import React, { useState, useEffect } from "react";
// import logo from "./logo.jpg";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
    // const [walletAddress, setWalletAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    
    // async function requestAccount() {
    //     console.log("Requesting Account...")
    
    //     // Check if Metamask exists
    //     if(window.ethereum) {
    //         console.log("Metamask detected!")
    
    //         try{
    //             const accounts = await window.ethereum.request({
    //                 method: "eth_requestAccounts",
    //             });
    //             // console.log(accounts);
    //             setWalletAddress(accounts[0]);
    //         } catch (error) {
    //             console.log("Error connecting...")
    //         }
    
    //     } else {
    //         console.log("Metamask not found")
    //     }
    // // }

    const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {   
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected!');
                // window.localStorage.setItem("rainwater-local-buttontxt", JSON.stringify('Wallet Connected!'))
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('No wallet found :(');
            window.alert("Please install the MetaMask browser extension to interact.")
		}
	}

    // update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        // window.localStorage.setItem("rainwater-local-address", JSON.stringify(newAccount));
	}

    // useEffect(() => {
    //     const acc = window.localStorage.getItem("rainwater-local-address");
    //     setDefaultAccount(JSON.parse(acc));
    //     // if(defaultAccount != null) {
    //     //     const txt = window.localStorage.getItem("rainwater-local-buttontxt");
    //     //     setConnButtonText(JSON.parse(txt));
    //     // }
    //     // else
    //     //     setConnButtonText('Connect Wallet')
    // });

    // Handle the chainID change here
    // console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
    const chainChangedHandler = () => {
        window.location.reload();
	}

    // listen for account changes
    if (window.ethereum && window.ethereum.isMetaMask) {
    	window.ethereum.on('accountsChanged', accountChangedHandler);
	    window.ethereum.on('chainChanged', chainChangedHandler);
    }
    else
        window.stop("Please install MetaMask browser extension to interact")

    return (
        <>
           <Nav>
            <div style={{color: "white", fontSize: "18.57px"}}><b>Current Address:</b> {defaultAccount}</div>
            {/* <NavLogo onClick={refreshPage} to={refreshPage}>
                <img src={logo} alt="logo" height="60" width="100"/>
            </NavLogo> */}
            <Bars />
            
            <div style={{color: "red"}}>{errorMessage}</div>

            <NavMenu>
                <NavBtn>
                    <NavBtnLink onClick={connectWalletHandler} to={connectWalletHandler}>
                        {connButtonText}
                    </NavBtnLink>
                </NavBtn>
            </NavMenu>
           </Nav> 
        </>
    );
};
export default Navbar;
