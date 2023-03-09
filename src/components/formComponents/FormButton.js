import React from 'react'

import '../../styles/formButton.css'

//BUTTON COMPONENT USED TO SUMBIT SYSTEM FORMS 
const Button = (props) =>{

    return(
        <button className = "button" type = {props.type} onClick = {props.onClick}
        disabled = {props.disabled}>
         {props.text}
        </button>
    )
}

export default Button;