import React from 'react'
import '../styles/atlasMarkerComponent.css'
import { useEffect } from 'react';

function AtlasMarkerComponent(props){

useEffect(() =>{
    console.log()
})

    return(
        <p className = "h1Regions">
            {props.title}
            <img src = {props.img} height = "26px" width = "26px" alt = "marker icon"></img>
        </p>  
    )
}

export default AtlasMarkerComponent;