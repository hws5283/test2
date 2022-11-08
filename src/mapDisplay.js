import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './App.css'

//component 3
export default function MapDisplay(){
    //postion of marker on the map display 
    const position = [0, 0];
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
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} >
            <TileLayer minZoom={1} maxZoom = {2}
                url={tileUrl}
            />
            <Marker position={position}>
                <Popup>
                     test popup <br /> Easily customizable.
                </Popup>
            </Marker>
           </MapContainer>
        </div>
    )
}