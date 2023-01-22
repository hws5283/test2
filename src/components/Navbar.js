import React from 'react'
import "leaflet/dist/leaflet.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Art} from './Art.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import{
  BrowserRouter,
  Routes,
  Route,
  Link,
}from "react-router-dom"
import MapDisplay from './MapDisplay';
import SignIn from './SignIn';
import Update from './Update';
import {About} from './About';
//can only have one parent root element is JSX expression*
//importing MapContainer, TileLayer component from react-leaflet
//state hook used in component navbar.js

//<Routes>
//<Route path = "/about" element = {<About/>}></Route>
//<Route path = "/art" element = {<Art/>}></Route>
//<Route path = "/" element = {<MapDisplay />}></Route>
//</Routes>

export default function NavbarBoot(){
  return (
    <BrowserRouter>
    <div>
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Team 13 Interactive Map</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as = {Link} to = "/">Map Display</Nav.Link>
            <Nav.Link as = {Link} to = "/login">Admin Login</Nav.Link>
            <Nav.Link as = {Link} to = "/update">Update Points</Nav.Link>
            <Nav.Link as = {Link} to = "/About">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
    <div>
      <Routes>
        <Route path = "/" element = {<MapDisplay/>}/>
        <Route path = "/login" element = {<SignIn></SignIn>}/>
        <Route path = "/update" element = {<Update></Update>}/>
        <Route path = "/About" element = {<About></About>}/>
      </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
}
      