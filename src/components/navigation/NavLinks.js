import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './NavLinks.css'
import { AuthContext } from '../general/context/auth-context';
//used to render content in the navbar!
const NavLinks = props =>{

    //holds latest context
    //component re renders when context changes ****
    const auth = useContext(AuthContext); //read and subscribe to context 

    //notice how we check the login state here
    return(
    <ul className = "nav-links">
        <li>
            <NavLink to = "/" >Map Display</NavLink>
        </li>
        {!auth.isLoggedIn &&
        <li>
            <NavLink to = "/login">Admin Login</NavLink>
        </li>
        }   
        {auth.isLoggedIn &&
        <li>
            <NavLink to = "/update">Update</NavLink>
        </li>
        }
        <li>
            <NavLink to = "/about">About</NavLink>
        </li>
    </ul>
    )

};


export default NavLinks;