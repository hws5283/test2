import React from 'react'
import {useReducer, useState, useEffect} from 'react'
import Data from '../../devInfo/mapLocations'
import '../../styles/input.css'

const inputReducer = (state,action) =>{
    switch(action.type){
        case 'CHANGE':
            return {
                value: action.val,   //update value 
                isValid: true       //update validity 
            };
        default:
            return state;
    }
}

const Input = props =>{

    //inputState - two fields 1. value 2. isValid 

    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});

    //called for every key stroke
    const changeHandler = event =>{
        dispatch({type: 'CHANGE', val: event.target.value}); // pass action 
        props.alter(event.target.value);
    }


    return(
        <div className = {`form-control`}>
            <label htmlFor= {props.id}>{props.label}</label>
                <textarea id = {props.id} rows = {10} cols = {50} onChange = {changeHandler} value = {props.value}></textarea>
                {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    )

}

export default Input;

    