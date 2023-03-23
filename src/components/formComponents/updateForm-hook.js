import { useCallback, useReducer } from "react";

//"reducer" function 
const formReducer = (state,action) => {
    
    switch(action.type){
        case  "INPUT_CHANGE":
            let formIsValid = false;
            for(const inputId in state){    //go through all inputs in our state (selection,description,images) 
                if(!state.inputs[inputId])     //if id does not match skip next statements for iteration
                    continue;   
                if(inputId === action.inputId){  //is this input the one getting updated in this current iteration/action ???
                    formIsValid = true;             //just set form validity to true because we changed atleast 1 area of the form 
                }
            }

            //return new State
            return{
                ...state,   //copy current state
                inputs:{                                    //update inputs with one iteration of this reducer
                    ...state.inputs,
                    [action.inputId]:{value:action.value},  //change value of current action, update either selection value, description or image
                },
                isValid: formIsValid
            }
        
        default:
            return state;
    }
};


export const useForm = (initialInputs, initialFormValidity) =>{

    //useReducer
    //1. Reducer
    //2. Initial inputs
    //returns - state and update function
    const [formState, dispatch] = useReducer(formReducer,{   
        inputs: initialInputs,  
        isValid: initialFormValidity
    });

    const inputHandler = useCallback((id, value)=>{
        console.log(value);
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            inputId: id
        });
           
    },[]);

    return[formState, inputHandler];
}