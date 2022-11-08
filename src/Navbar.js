import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import "leaflet/dist/leaflet.css"
import './styles.css'
//can only have one parent root element is JSX expression*
//importing MapContainer, TileLayer component from react-leaflet
//state hook used in component navbar.js 
export default function Navbar(){
    return (
        //component 1
        <nav className = "nav">
        <a href ="/" className = "site-title">TEAM 13 INTERACTIVE MAP</a>

        <ul>
            
            <li className = "active">
                <a href = "/Map">Map</a>
            </li>
            
            <li>
                <a href = "/about">About</a>
            </li>
            
            <li>
                <a href = "/services">Services</a>
            </li>
            
            <li>
                <a href = "/art">Art</a>
            </li>  
        </ul> 

    </nav>
   
    )       
}
