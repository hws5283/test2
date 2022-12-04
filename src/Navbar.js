import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import "leaflet/dist/leaflet.css"
import './styles.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//can only have one parent root element is JSX expression*
//importing MapContainer, TileLayer component from react-leaflet
//state hook used in component navbar.js

export default function NavbarBoot(){
        return (
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="#home">Team 13 Interactive Map</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#features">Art</Nav.Link>
                  <Nav.Link href="#pricing">About</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
           
        );
}
      