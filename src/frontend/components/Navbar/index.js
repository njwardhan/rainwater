import React from "react";
import logo from "./logo.jpg";
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
    return (
        <>
           <Nav>
            <NavLogo to="/">
                <img src={logo} alt="logo" height="60" width="100"/>
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink 
                  to="/ecosystem"
                  activeStyle={{ color:'black' }}
                >
                    Ecosystem
                </NavLink>
                <NavLink 
                  to="/community"
                  activeStyle={{ color: 'black' }}
                >
                    Community
                </NavLink>
                <NavLink 
                  to="/contact" 
                  activeStyle={{ color: 'black' }}
                >
                    Contact
                </NavLink>
                <NavLink
                  to="/faq"
                  activeStyle={{ color: 'black' }}
                >
                    FAQ
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/launch-app" target="_blank">
                        Launch App
                    </NavBtnLink>
                </NavBtn>
            </NavMenu>
           </Nav> 
        </>
    );
};
export default Navbar;
