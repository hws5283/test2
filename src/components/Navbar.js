import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import "leaflet/dist/leaflet.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {render} from "react-dom"
import {About} from './About'
import {Art} from './Art'
import LeftSearch from '../leftSearch.js'
import{
  BrowserRouter,
  Routes,
  Route,
  Link,
}from "react-router-dom"
//can only have one parent root element is JSX expression*
//importing MapContainer, TileLayer component from react-leaflet
//state hook used in component navbar.js

export default function NavbarBoot(){
        return (
          <BrowserRouter>
          <div>
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="#home">Team 13 Interactive Map</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link as = {Link} to ="/">Home</Nav.Link>
                  <Nav.Link as ={Link} to = "/art">Art</Nav.Link>
                  <Nav.Link as = {Link} to = "/about">About</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          <div>
               <Routes>
                  <Route path = "/about" element = {<About/>}></Route>
                  <Route path = "/art" element = {<Art/>}></Route>
                  <Route path = "/" element = {<LeftSearch/>}></Route>
               
              </Routes>
             
          </div>
          </div>
          </BrowserRouter>
        );
}
      