import React, {useState, useRef} from 'react'
import "../styles/button.css"

//this component showcases button for map interaction, has connection to Search component
function ButtonComp(props){

    const btnRef = useRef();

    const buttonClickHandler = buttonName =>{
        props.buttonEvent(buttonName, "glow-button-active", btnRef);   //pass btn name, active state, and ref 
    }

    return(
    <div className = "Buttons">
        <button className = {'glow-button'} ref = {btnRef} onClick = {() => buttonClickHandler(props.label)}>
            {props.label}
        </button>       
    </div>
    )
}

export default ButtonComp;