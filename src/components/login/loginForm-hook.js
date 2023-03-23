import { useCallback, useReducer } from "react";

const formReducer = (state,action) => {
    switch(action.type){
        case 'INPUT_CHANGE':
        let formIsValid = true;
        for(const inputId in state.inputs){
        if(!state.inputs[inputId]){
            continue;
        }
        if(inputId===action.inputId){
                formIsValid = formIsValid && action.isValid;
        }
        else{
            formIsValid = formIsValid &&state.inputs[inputId].isValid;
        }
        }
        return{
            ...state,
            inputs:{
                ...state.inputs,
                [action.inputId]: {value:action.value, isValid: action.isValid}
            },
            isValid: formIsValid
        };
        default:
            return state;
    }
};

//initially given form object and validity value 
//initialInputs - initial values of the form
//initialFormValidity - initial validity of the form (initially false)
export const useLogin = (initialInputs, initialFormValidity) =>{

    const [formState, dispatch] = useReducer(formReducer,{    //passed back to Auth (1)
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    //function reused and does not change on rerenders, avoids running useEFFect again   // passed back to Auth(2)
    //stored by react not recreated 
    const inputHandler = useCallback((id, value, isValid)=>{
        dispatch({
            type: 'INPUT_CHANGE', 
            value: value, 
            isValid: isValid,
            inputId: id
        });
           
    },[]);


    return[formState, inputHandler];
}