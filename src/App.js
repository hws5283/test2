import React from 'react';
import NavbarBoot from "./components/Navbar"
import "leaflet/dist/leaflet.css"
import LeftSearch from './leftSearch';
//app.css currently has no effect....
//send to index.js to be rendered
//mainDisplay div is flex parent, leftsearch and map children flex items
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
