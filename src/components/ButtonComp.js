import React from 'react'
import "../styles/button.css"
import JSONDATA from "../devInfo/mapLocations.json"

//this component showcases button for map interaction, has connection to Search component
function ButtonComp(props){

    return(
    <div className = "Buttons">
        <button className = "glow-button">
            {props.label}
        </button>       
    </div>
    )
}

export default ButtonComp;