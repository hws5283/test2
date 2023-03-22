import React, { useEffect, useContext, useReducer} from 'react'
import './update.css'
import {useState} from 'react'
import Input from './Input';
import Button from './FormButton'
import Selection from './Selection'
import { VALIDATOR_MINLENGTH } from '../../utils/validators'
import ImageUpload from './ImageUpload'
import { AuthContext } from '../general/context/auth-context';
import LoadingSpinner from '../general/LoadingSpinner';
import {useForm} from './updateForm-hook'
//THIS PAGE DEALS WITH UPDATING MAP COMPONENTS IT GENERATES A TEXTBOX AND IMAGE UPLOAD BUTTON WITH A SUBMIT FOR BUTTON
export default function Update(){

    const [loadedPlace, setLoadedPlace] = useState("");              //value of textbox
    const auth = useContext(AuthContext);
    const[isLoading,setIsLoading] = useState(false);    //controls the loading spinner
    const[successStatus, setSuccess] = useState(false);


    const changeReducer = (state,action) =>{
        switch(action.type){
            case "SELECTION_CHANGE":
                setLoadedPlace(action.value);
                return {
                    ...state,
                    selection: { value: action.value}
                }
            case "INPUT_CHANGE":
                setLoadedPlace(action.value);
                return{
                    ...state,
                    description: {value: action.value}
                }
            case "IMAGE_CHANGE":
                  return{
                    ...state,
                    images: {formFiles: action.formFiles}
                  }
            default:
                return state;
        }
    }
   
    const [formState, dispatch] = useReducer(changeReducer,              
        {
            selection: {
                value: 'Lake Leonard',          
              },
              description: {
                value: '',
              },
              images: {             
                formFiles: [],
              }
        },
      );
  
    
    useEffect(()=>{
        const fetchPlace = async () =>{
            console.log("usestate called");
            let response = "";
            let responseData = "";
            try{
                response = await fetch(`http://localhost:5000/api/places/byname/${formState.selection.value}`);
                responseData = await response.json();
                setLoadedPlace(responseData.placebyName.description);   //STATE CHANGE
                
                if(response && !response.ok){
                    console.log("error loading data");
                }
      
            }catch(err){
                console.log(err);
            }
        }
        fetchPlace();
    },[formState.selection.value]);  //should only be called when dropdown changes and on initial render 
    
    //function called on submition of the html form 
    
    const markerUpdateSubmitHandler =  async (event) =>{   
        event.preventDefault(); //NEEDTHIS
        console.log("update request sent");
        setIsLoading(true);
        //NOTE, USING PROTECTED ROUTE HERE, WE MUST PROVIDE A TOKEN!!!, or this request wont work -> check backend code
        const url = `http://localhost:5000/api/places/upload/${formState.selection.value}`;  
    
        try{
        const fd = new FormData();
        fd.append('description', formState.description.value);
       

        for(var x = 0; x<formState.images.formFiles.length; x++){  //loop through file array and attach files to form data
           fd.append('image', formState.images.formFiles[x]);
        }

        const requestOptions = {
            method: 'POST',
            body:fd,
            headers:{Authorization: 'Bearer ' + auth.token}     //attatch token, retrieved from context ****
        }
        //Authorization: 'Bearer' + auth.token
        await fetch(url,requestOptions);
        
        }catch(err){

        };
        setSuccess(true);
        setIsLoading(false);
    }
    
    

    //All components here need a pointer to the inputHandler function from the useform hook ***
  
    const checkData = () =>{
        console.log(formState.selection.value);
        console.log(formState.description.value);
        console.log(formState.images.formFiles);
    }
    
    return(
        <div className = "updateDiv">
            <div>
                <button onClick = {checkData}>test button</button>
            </div>
        <div className = "formDiv">
        {loadedPlace &&
        <form className = "updateForm" onSubmit={markerUpdateSubmitHandler} >
            <div className = "selectComponent">
                <Selection reducer = {dispatch} id = "selection"></Selection>   
            </div>
            <div className = "descriptionUpdate">

            <div className = "box1">
            <Input 
            reducer = {dispatch}
            element = "textbox" 
            type = "text" 
            id = "description"
            label = "Description" 
            errorText = "No description provided, add one if needed."
            initialValue = {loadedPlace}
            />
            </div>
            </div>
            <div>
            <ImageUpload id = "images" reducer = {dispatch}></ImageUpload>
            </div>
            {successStatus &&
            <div  className = "formFeedback">
                <p>
                    Data submitted successfully, check map page for updates....
                </p>
            </div>
            }
            <div className = "submit-Btn">
                <Button disabled = {false} type = "submit" text = "Update Marker"></Button>
            </div>
            
            {isLoading && <LoadingSpinner asOverlay/>}
        </form>
        
        }
        </div>
        </div>
    )
}


