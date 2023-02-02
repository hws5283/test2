import React, { useEffect } from 'react'
import '../styles/update.css'
import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Input from './formComponents/Input';
import Button from './formComponents/Button';
import Selection from './formComponents/Selection'
export default function Update(){

    //FORM FOR ALTERING MAP COMPONENTS 

    const[loading, setLoading] = useState(true);

    const [placeName,setPlaceName] = useState("Lake Leonard");  //default one first load to lake leonard(first choice in drop down)
    //const [loadedPlace,setLoadedPlace] = useState({});   // place document loaded from db 
    const [newDescription, setDescription] = useState("");
   
/*
    useEffect(() =>{
        const sendUpdateLocation = async () =>{
            setLoading(true); //we are loading...
            try{
                const response = await fetch(`http://localhost:5000/api/places/byname/${placeName}`);  //default value of form 
                const responseData = await response.json();  
                if(!response.ok){
                    console.log("error loading map data");
                }
                else{
                    console.log(responseData);
                }
                setLoadedPlace(responseData.placebyName);     //set the place to document retreived from db - backend returns placebyName object
            }catch(err){
                console.log("error");
            }
            setLoading(false);  //done sending request 
        }
        sendUpdateLocation();   
    },[placeName]);  //dependency (name of loadded place),(loadedPlace)
    */

    //called on form submission -> needs to update the document in mongodb, need to keep selection consistent with this url
    //placeName holds the current selection, fed into backend url 
    const markerUpdateSubmitHandler =  async event =>{

        console.log(newDescription);
        const url = `http://localhost:5000/api/places/${placeName}`;   //the patch route
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
            errorText = "Please enter a valid description"
            //value = {loadedPlace.description}
            valid = {true}
            alter = {setDescription}
            >
            </Input>
            </div>

            <div>
                <Button type = "submit" errorText = "please enter valid description"></Button>
            </div>
           
        </form>
        </div>
    )
}