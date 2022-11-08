import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import "leaflet/dist/leaflet.css"
import './App.css'
import { useState } from 'react'
import JSONDATA from "./mapLocations.json"
import "./LeftSearch.css"
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

//component - just a js function returning jsx 
//1 COMPONENT 1 FILE ***
//component 2
//component for left side bar search, gives indications to user based on input
//mapLocations.json hold the map point titles which are used in the below component 
export default function LeftSearch(){
    const [searchTerm,setSearchTerm] = useState('') 
    return(

        <div className = "leftSearch">
        {
            /*
            LEFT SIDE SEARCH LOGIC/COMPONENT
            UseState hook 
            searchTerm equal to input 
            */
        }
        <input type = "text" placeholder = "Try searching a location!" onChange = {event => {setSearchTerm(event.target.value)}}/>
        {JSONDATA.filter(val=>{
            if(searchTerm ==""){
                return val
            }else if (val.location.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
            }
        }).map((val,key)=>{
            //onClick = {test(val.id)} ??maybe
            return <div className = "locations" > 
                <Button className = 'reactButton'variant = "warning" size = "sm" >
                  {val.location}
                </Button>
                   
            </div>;
        })}
        
    </div>
    )
}







