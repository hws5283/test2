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
import Atlas from './Atlas'
import "./atlas.css"
import "./button.css"

//component - just a js function returning jsx 
//1 COMPONENT 1 FILE ***
//component 2
//component for left side bar search, gives indications to user based on input
//mapLocations.json hold the map point titles which are used in the below component 
export default function LeftSearch(){

    const [searchTerm,setSearchTerm] = useState('');
    const inputRef = useRef();
    const position = [9, -22];
    const tileUrl = './cuts/{z}/{x}/{y}.png';

    const mapRef = useRef(null); //map reference 
    const markerRefs = useRef({});   //ref array ***
    const LakeEvanRef = useRef(null);   //ref for marker 1
    const marker2Ref = useRef(null);   //ref for marker 2 ect...
    const marker3Ref = useRef(null);
    const marker4Ref = useRef(null);

    var data;
    var records;

    const cavernIcon = new L.Icon({
        iconUrl:cavernMarker,
        iconSize:[26,26]
    });

    const lakeIcon = new L.Icon({
        iconUrl:lakeMarker,
        iconSize:[26,26]
    });

    const forestIcon = new L.Icon({
        iconUrl:forestMarker,
        iconSize:[26,26]
    });

    const mountainIcon = new L.Icon({
        iconUrl:mountainMarker,
        iconSize:[26,26]
    });

    //parameter "title" is text of each button 
    //better to define these functions not inline 
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

    return(
        //MAIN DIV, utilizes flex 
        <div className = "leftSearch">  
       
        <div className = "test3" key = "testing">
            
            <input ref = {inputRef} id = "userInputBar"type = "text" placeholder = "Try searching a location!" onChange = {event => {setSearchTerm(event.target.value)}}/>
          
             {JSONDATA.filter(val=>{
                 if(searchTerm ===""){
                     return val
                 }else if (val.location.toLowerCase().includes(searchTerm.toLowerCase())){
                     return val
                 }
                 }).map((val,key)=>{
            //onClick = {test(val.id)} ??maybe
            //Adding event listener for click events on all generated buttons 
            
                 return (
              
                    <div className = "buttonDiv">
                        <button className = 'glow-button' title = {val.location} onClick={()=>clickHandler(val.location)}>
                         {val.location}
                        </button>
                    </div>

          
                 )
                   
            
        })}
        </div>

        <div className = "mapDisplay">    
            <MapContainer 
                whenCreated={(map) => {
                    mapRef.current = map;
                }} 
                center={position} 
                zoom={13} 
                scrollWheelZoom={true} 
                style = {{height: "800px", width: "800px"}}>
            
                <TileLayer minZoom={2} maxZoom = {4} continuousWorld = {false} noWrap = {true}
                    url={tileUrl}
                />
                <Marker 
                     id = "Lake Evan" 
                     icon = {lakeIcon} 
                     position={[mapData[0].positionY,mapData[0].positionX]} 
                     title = {mapData[0].title}
                     ref = {(ref)=>{
                        markerRefs.current[mapData[0].title] = ref;
                     }} 
                     >
                    <Popup>
                        <img src = {require("./navImages/forestIcon.webp")} alt = "react logo"
                        width = "100px" height={"100px"}/>        
                        <p>The description of map point " Lake Evan "</p>
                    </Popup>
                </Marker>
                
                <Marker icon = {forestIcon} 
                        position={[17,-15]} 
                        title = {mapData[1].title}
                        ref = {(ref)=>{
                            markerRefs.current[mapData[1].title] = ref;
                        }}
                        >
                    <Popup>Hello</Popup>
                </Marker>

                <Marker 
                ref = {marker3Ref} icon = {lakeIcon} position={[-30, 80]} title = {mapData[2].title}>
                    <Popup>
                        <p>
                           
                        </p>
                        <img src = "" alt = "Lake Leonard">
                        </img>
                        <p>
                           
                        </p>
                    </Popup>
                </Marker>

                <Marker ref = {marker3Ref} icon = {cavernIcon} position={[16,-30]} title = {mapData[2].title}>
                    <Popup>Hello</Popup>
                </Marker>

                <Marker ref = {marker4Ref} icon = {mountainIcon} position={[23,-29]} title = {mapData[3].title}>
                    <Popup>Hello</Popup>
                </Marker>

                <Marker ref = {marker4Ref} icon = {lakeIcon} position={[30,-15]} title = {"Lake Echo"}>
                    <Popup>Hello</Popup>
                </Marker>

                <Marker ref = {marker4Ref} icon = {lakeIcon} position={[30,-50]} title = {"Capriotti Sea"}>
                    <Popup>Hello</Popup>
                </Marker>

                <Marker ref = {marker4Ref} icon = {lakeIcon} position={[40,-9]} title = {"Katie Point"}>
                    <Popup>Hello</Popup>
                </Marker>

                <Marker ref = {marker4Ref} icon = {lakeIcon} position={[40,-9]} title = {"Capriotti Sea"}>
                    <Popup>Hello</Popup>
                </Marker>

                <Marker ref = {marker4Ref} icon = {lakeIcon} position={[50,-9]} title = {"Capriotti Sea"}>
                    <Popup>Hello</Popup>
                </Marker>

                <Marker ref = {marker4Ref} icon = {lakeIcon} position={[45,-8]} title = {"Heckman Hill"}>
                    <Popup>Hello</Popup>
                </Marker>


           </MapContainer>
        </div>     
    </div> //END MAIN DIV
    )
}







