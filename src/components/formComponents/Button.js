import React from 'react'

import '../../styles/formButton.css'

const Button = (props) =>{

    return(
        <button className = "formSubmit" type = {props.type} onClick = {props.onClick}
        disabled = {props.disabled}>
        Update Marker
        </button>
    )
}

export default Button;