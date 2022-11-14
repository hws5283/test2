import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './App.css'
import JSONDATA from "./popUpXY.json"

//component 3
export default function MapDisplay(){
    //postion of marker on the map display 
    const position = [9, -22];
    const tileUrl = './cuts/{z}/{x}/{y}.png';
    return(
        <div classname = "mapDisplay">
            {
                 /*
                    Map Container COMPONENT is responsible for creating the leaflet map instance
                    and providing it to its child components, using a React Context. 
                    MUST IMPORT MapContainer***
                    IMPORTANT NOTE ******
                     Map image assets MUST BE IN PUBLIC FOLDER TO BE RENDERED by TileLayer component, have no idea why 
                */
            }
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style = {{height: "900px", width: "900px"}}>
            <TileLayer minZoom={0} maxZoom = {4}
                url={tileUrl}
            />
            <Marker position={[JSONDATA[0].positionY, JSONDATA[0].positionX]}>
                <Popup title = "Lake Evan">
                    <img src ="./logo192.png" alt = "testing"></img>
                    {JSONDATA[0].title}
                </Popup>
            </Marker>
           </MapContainer>
        </div>
    )
}