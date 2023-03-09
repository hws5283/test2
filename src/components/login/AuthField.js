import React, {useReducer, useEffect} from 'react';
import './AuthField.css'
import {validate} from '../../utils/validators'

//custom form input for Sign in 
//combines a label and input field ONLY renders input html element
//has built in user validation
//manage what user entered and if what they entered was valid or not 
//(INPUT)


//NOTE: inputReducer outside of component (not dependent on any inputs)
//reducer function - performs state updates 
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

  //inputState - state of the input
  //dispatch - dispatch method 
  const [inputState, dispatch] = useReducer(inputReducer, {      //give 1. reducer, 2. initial arguments  (state)
     value: props.initialValue || "",            //either an initial prop value or an empty string
     isTouched: false,                            //initially false
     isValid: props.initialValid||false           //validity, defaults to false
    });

    const {id, onInput} = props;   //on change use useeffect to call function in Auth and reload
    const {value, isValid} = inputState;  //holds value and is valid of inputState

    //-----------------------------------------------------------------------
    useEffect(()=>{
      onInput(id,value,isValid);       //sends values to the inputHandler in login form hook 
    }, [id,value,isValid, onInput]);   //when id, value, isValid, or onInput changes call useEffect
    //-----------------------------------------------------------------------

    const touchHandler = () =>{
      dispatch({
        type: 'TOUCH'
      });
    }

  //NOTE - dispatch is not an update function it just dispatching an action - (object with a type)
  //trigger when user enters something(called for every keystroke)
  //when this is called want to 1. store value 2. validate it -> (2 states, useReducer!)
  const changeHandler = event=>{
    dispatch({                //information here passed to reducer function (action)
      type:'CHANGE', 
      val: event.target.value,      //capturing value change here 
      validators: props.validators
    });
  };

  const element = 
    props.element === 'input' ?(
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 5}  //10
        cols = {props.cols || 10} //50
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}>
      <label htmlFor={props.id} className = "loginLabel">{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched &&<p>{props.errorText}</p>}
    </div>
  );
};

export default AuthField;
