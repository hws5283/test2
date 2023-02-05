import React, { useEffect } from 'react'
import '../styles/update.css'
import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Input from './formComponents/Input';
import Button from './formComponents/Button';
import Selection from './formComponents/Selection'
import { VALIDATOR_MINLENGTH } from '../utils/validators'
export default function Update(){

    //FORM FOR ALTERING MAP COMPONENTS 

    const[loading, setLoading] = useState(true);

    const [placeName,setPlaceName] = useState("Lake Leonard");  //keeps track of what point is selected 
    const [newDescription, setDescription] = useState("");
   

    const markerUpdateSubmitHandler =  async event =>{

        console.log(newDescription);
        const url = `http://localhost:5000/api/places/${placeName}`;   //what point am i updating 
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json' },
            body:JSON.stringify({newDescription})   //  ->    {value: '', isValid: TF}, {"value": '', "isValid": TF}
        }

        try{
            await fetch(url,requestOptions);   //try to send out request to backend 

        }catch(err){
            console.log(err);
        }
    }

    //input1 - change picture,  input2 change description 
    //return the form.. 
    return(
        <div className = "updateDiv">
        <form className = "updateForm" onSubmit={markerUpdateSubmitHandler}>

            <div>
                <Selection selection = {setPlaceName}></Selection>
            </div>
            <div>
            <Input 
            element = "textbox" 
            type = "text" 
            label = "Description" 
            errorText = "No description will be changed for this update...(no description provided)"
            //value = {loadedPlace.description}
            validators = {[VALIDATOR_MINLENGTH(1)]}   //checks for no input into description area 
            alter = {setDescription}
            >
            </Input>
            </div>

            <div>
                <Button disabled = {false} type = "submit"></Button>
            </div>
           
        </form>
        </div>
    )
}