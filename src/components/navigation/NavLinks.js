import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavLinks.css'
const NavLinks = props =>{

    return(
    <ul className = "nav-links">
        <li>
            <NavLink to = "/" exact>Map Display</NavLink>
        </li>
        <li>
            <NavLink to = "/login">Admin Login</NavLink>
        </li>
        <li>
            <NavLink to = "/update">Update</NavLink>
        </li>
        <li>
            <NavLink to = "/about">About</NavLink>
        </li>
    </ul>
    )

};


export default NavLinks;