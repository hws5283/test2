import "./atlas.css"
import React, {Component} from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import "leaflet/dist/leaflet.css"
import './App.css'
import { useState } from 'react'
import JSONDATA from "./mapLocations.json"
import mapData from "./popUpXY.json"
import "./LeftSearch.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'bootstrap'
import { click } from '@testing-library/user-event/dist/click'
import MapDisplay from './mapDisplay'
import {useRef} from 'react'
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet'
import cavernMarker from './navImages/cavern.webp'
import lakeMarker from './navImages/lakeIcon.webp'
import forestMarker from './navImages/forestIcon.webp'
import mountainMarker from './navImages/mountainIcon.png'
import L, { marker } from 'leaflet'
import "./atlas.css"
import "./button.css"

export default function Atlas(){

    const [searchTerm,setSearchTerm] = useState('');
    const inputRef = useRef();
    const position = [9, -22];
    const tileUrl = './cuts/{z}/{x}/{y}.png';

    const mapRef = useRef(null); //map reference 
    const markerRefs = useRef({});   //ref array ***

    const clickHandler =(title) =>{

        inputRef.current.value = title;  //set input field to button click using hook 
        const markerToOpen = markerRefs.current[title]; //the marker ref
        const myMap = mapRef.current;           //map ref - ALWAYS THE SAME
        if (markerToOpen){
             markerToOpen.openPopup();           //show the popup display 
        }

        if (!myMap) {
            return
        }
    
        myMap.flyTo(position,13);   //fly to marker
        
    }

    return (
        <div className = "test">

            <div className = "title">
                <h1>Atlas</h1>
            </div>

            <div className = "title">
                <h3>Echo Lake Region</h3>
            </div>

            {JSONDATA.filter((val) => {
                if (val.id === 12 || val.id === 13 || val.id === 25 || val.id === 26 || val.id === 27 || val.id === 28 || val.id === 29 || val.id === 30){
                    return val
                }
            }).map((val,key)=>{

                return (
                    <div className = "buttonDiv">
                        <button className = 'glow-button' title = {val.location} onClick={()=>clickHandler(val.location)}>
                            {val.location}
                        </button>
                    </div>
                )
            })}

            <div className = "title">
                <h3>Twin Lakes Region</h3>
            </div>

            {JSONDATA.filter((val) => {
                if (val.id === 14 || val.id === 15 || val.id === 4 || val.id === 31 || val.id === 32){
                    return val
                }
            }).map((val,key)=>{

                return (
                    <div className = "buttonDiv">
                        <button className = 'glow-button' title = {val.location} onClick={()=>clickHandler(val.location)}>
                            {val.location}
                        </button>
                    </div>
                )
            })}

        </div>
    ) //There's no better way to do this for now, so I did it the long way. I suggest we add a region marker to the database and then filter by region.
}