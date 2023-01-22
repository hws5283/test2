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
        </p>
    )
}

export default AtlasMarkerComponent;