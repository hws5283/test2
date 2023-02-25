import React from 'react'
import {useReducer, useState, useEffect} from 'react'
import Data from '../../devInfo/mapLocations'
import '../../styles/input.css'
import {validate} from '../../utils/validators'



const Input = props =>{


    //called for every key stroke when input changes 
    const changeHandler = event =>{
        props.updater(event.target.value);
    }

    return(
        <div className = "textBox">
            <div className = "textBoxLabel">
                 <label className = "LabelArea" htmlFor= {props.id}>{props.label}</label>
            </div>
            <div className = "decriptionInput">
                <textarea className = "descriptionArea" id = {props.id} rows = {10} cols = {50} onChange = {changeHandler} value = {props.initialValue} disabled = {props.disabled}></textarea>
                
            </div>
                
        </div>
    )

}

export default Input;

    