import React, {useReducer, useEffect} from 'react';
import './AuthField.css'
import {validate} from '../../utils/validators'

//custom form input for Sign in 
//combines a label and input field ONLY renders input html element
//has built in user validation
//manage what user entered and if what they entered was valid or not 
//(INPUT)


//NOTE: inputReducer outside of component (not dependent on any inputs)
const inputReducer = (state, action)=>{
    switch(action.type){
        case 'CHANGE':
            return{
                ...state,             //copy old state object 
                value: action.val,   //BE careful with value names here
                isValid: validate(action.val, action.validators)   //use validate function from validator, give the value entered 
            };                                                      //and validators for that input
        case 'TOUCH': {
          return{
            ...state,
            isTouched:true
          }
        }
        default:
            return state;
    }
};

const AuthField = props =>{
  const [inputState, dispatch] = useReducer(inputReducer, {      //give 1. reducer, 2. initial arguments
     value: props.initialValue || "",
     isTouched: false,
     isValid: props.initialValid||false
    });

    const {id, onInput} = props;   //on change use useeffect to call function in Auth and reload
    const {value, isValid} = inputState;

    useEffect(()=>{
      onInput(id,value,isValid);
    }, [id,value,isValid, onInput]);


    const touchHandler = () =>{
      dispatch({
        type: 'TOUCH'
      });
    }

  //trigger when user enters something(called for every keystroke)
  //when this is called want to 1. store value 2. validate it -> (2 states, useReducer!)
  const changeHandler = event=>{
    dispatch({                //information here passed to reducer function 
      type:'CHANGE', 
      val: event.target.value, 
      validators: props.validators
    });
  };
  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}>
      <label htmlFor={props.id} className = "loginLabel">{props.label}</label>
      <input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder} 
        onChange = {changeHandler} //bind to onChange
        onBlur = {touchHandler}
        value = {inputState.value}  //two way binding
        />
        {!inputState.isValid && inputState.isTouched &&<p>{props.errorText}</p>}
    </div>
  );
};

export default AuthField;
