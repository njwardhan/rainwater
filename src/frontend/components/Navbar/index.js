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
                  to="/"
                  activeStyle={{ color:'black' }}
                >
                    Ecosystem
                </NavLink>
                <NavLink 
                  to="/about"
                  activeStyle={{ color: 'black' }}
                >
                    Community
                </NavLink>
                <NavLink 
                  to="/contact" 
                  activeStyle={{ color: 'black' }}
                >
                    FAQ
                </NavLink>
                <NavLink
                  to="/signin"
                  activeStyle={{ color: 'black' }}
                >
                    Contact
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/sign-up">Launch App</NavBtnLink>
                </NavBtn>
            </NavMenu>
           </Nav> 
        </>
    );
};
export default Navbar;
