import React from 'react';
import NavbarBoot from "./components/Navbar.js"
import "leaflet/dist/leaflet.css"
import Data from './devInfo/mapLocations'

import {useState} from 'react'

import LeftSearch from "./components/leftSearch"
import MapDisplay from "./components/MapDisplay"
import Atlas from "./components/Atlas"
import './styles/mainPage.css'

//app.css currently has no effect....
//send to index.js to be rendered
//mainDisplay div is flex parent, leftsearch and map children flex items

//all map locations 
const point_locations = Data;

function App() {

  const [mapRef,setReference] = useState(null);

  //pass pointer to function to leftSearch component in
  const setMapReference = theMap =>{
    setReference(theMap);
    console.log('ref set');
    console.log(mapRef);
  }

  return(
    <div>
      <div className = "navbarComponent">
          <NavbarBoot />
          
          <div className = "displayMain">
            <div>
                <LeftSearch locations = {point_locations}></LeftSearch>
            </div>
            <div className = "mapCont">
                <MapDisplay refPointer = {setMapReference}></MapDisplay>
            </div>
            <div className = "displayAtlas">
                <Atlas locations = {point_locations}></Atlas>
            </div> 
        </div>

      </div>
    </div>
  )

}

export default App;
