import React from 'react';
import Navbar from "./Navbar"
import "leaflet/dist/leaflet.css"
import "./App.css"
import LeftSearch from './leftSearch';
import MapDisplay from './mapDisplay';
//app.css currently has no effect....
//send to index.js to be rendered
function App() {
  return(
    <div className = "mainDisplay">
      <div className = "navbarComponent">
          <Navbar />
      </div>
       <div className='LeftSearchComponent'>
         <LeftSearch/>
       </div>
       <div className='MapDisplayComponent'>
         <MapDisplay/>
       </div>
    </div>
  )

}

export default App;
