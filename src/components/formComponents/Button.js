import React from 'react'

import '../../styles/formButton.css'

const Button = props =>{


    return(
        <button className = "formSubmit" type = "submit"
        disabled = {props.disabled}>
        Update Marker
        </button>
    )
}

export default Button;