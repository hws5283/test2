import React from 'react'
import {useReducer, useState, useEffect} from 'react'
import Data from '../../devInfo/mapLocations'
import '../../styles/input.css'
import {validate} from '../../utils/validators'

//the reducer - function receiving action and recieves current state base on action, return new state
//and re-render
//WE CONSIDER INVALID DESCRIPTION INPUT AS NOTHING ENTERED...form can still be submited have to indicate no description was added 
const inputReducer = (state,action) =>{
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,        //copy all key value pairs
                value: action.val,   //update value 
                isValid: validate(action.val, action.validators)       //update validity 
            };
        default:
            return state;  //return existing unchanged state
    }
}

const Input = props =>{

    //managing two states that are related ->useReducer

    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});

    //called for every key stroke when input changes 
    const changeHandler = event =>{
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators}); // dispatch to reducer
        props.alter(event.target.value);
    }


    return(
        <div className = {'form-control'}>
            <label htmlFor= {props.id}>{props.label}</label>
                <textarea id = {props.id} rows = {10} cols = {50} onChange = {changeHandler} value = {props.value}></textarea>
                {!inputState.isValid && <p className = "errorMess">{props.errorText}</p>}
        </div>
    )

}

export default Input;

    