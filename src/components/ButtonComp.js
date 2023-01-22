import React from 'react'
import "../styles/button.css"
import JSONDATA from "../devInfo/mapLocations.json"

//this component showcases button for map interaction, has connection to Search component
function ButtonComp(props){

    const buttonClickHandler = buttonName =>{
        props.buttonEvent(buttonName);
    }

    return(
    <div className = "Buttons">
        <button className = "glow-button" onClick = {() => buttonClickHandler(props.label)}>
            {props.label}
        </button>       
    </div>
    )
}

export default ButtonComp;