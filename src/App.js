import React from 'react';
import NavbarBoot from "./components/Navbar.js"
import "leaflet/dist/leaflet.css"
import Data from './devInfo/mapLocations'

import {useState} from 'react'

import LeftSearch from "./components/leftSearch"
import MapDisplay from "./components/MapDisplay"
import Atlas from "./components/Atlas"
import MapButtons from './components/MapButtons.js';

//app.css currently has no effect....
//send to index.js to be rendered
//mainDisplay div is flex parent, leftsearch and map children flex items

//all map locations 

function App() {

  return(
    <div>
      <div className = "navbarComponent">
          <NavbarBoot />
      </div>
    </div>
  )

}

export default App;
