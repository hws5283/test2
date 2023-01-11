import React from 'react'
import "leaflet/dist/leaflet.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {About} from './About.js'
import {Art} from './Art.js'
import 'bootstrap/dist/css/bootstrap.min.css'

import{
  BrowserRouter,
  Routes,
  Route,
  Link,
}from "react-router-dom"
//can only have one parent root element is JSX expression*
//importing MapContainer, TileLayer component from react-leaflet
//state hook used in component navbar.js


//<div>
//<Routes>
  // <Route path = "/about" element = {<About/>}></Route>
   //<Route path = "/art" element = {<Art/>}></Route>
  // <Route path = "/" element = {<MainPage />}></Route>
//</Routes>

//</div>

export default function NavbarBoot(){
        return (
          <BrowserRouter>
          <div>
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="#home">Great Shadeck Expanse</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link as = {Link} to ="/">Home</Nav.Link>
                  <Nav.Link as ={Link} to = "/art">Art</Nav.Link>
                  <Nav.Link as = {Link} to = "/about">About</Nav.Link>
                  <Nav.Link as = {Link} to = "/adminLog">Admin SignIn</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          </div>
          </BrowserRouter>
        );
}
      