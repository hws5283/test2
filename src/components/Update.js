import React, { useEffect } from 'react'
import '../styles/update.css'
import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Input from './formComponents/Input';
import Button from './formComponents/FormButton'
import Selection from './formComponents/Selection'
import { VALIDATOR_MINLENGTH } from '../utils/validators'
import ImageUpload from './formComponents/ImageUpload'
//THIS PAGE DEALS WITH UPDATING MAP COMPONENTS IT GENERATES A TEXTBOX AND IMAGE UPLOAD BUTTON WITH A SUBMIT FOR BUTTON
export default function Update(){

    const [placeName,setPlaceName] = useState("Lake Leonard");  
    const [loadedPlace, setLoadedPlace] = useState("");              //default value of textBox
    const [descriptionInput,setDescriptionInput] = useState("");    
    const[file,setFile] = useState(null); 

    //NOTE, passing useState function as a prop is valid react technique...

    //loads in description based on selection in Selection component 

    useEffect(()=>{
        const fetchPlace = async () =>{

            try{
                const response = await fetch(`http://localhost:5000/api/places/byname/${placeName}`);
                const responseData = await response.json();
                if(!response.ok){
                    console.log("error loading data");
                }
                else{
                    console.log("success response");
                    setLoadedPlace(responseData.placebyName.description);   //STATE CHANGE
                }
                
            }catch(err){
                console.log(err);
            }
        }
        fetchPlace();
    },[placeName]);  //should only be called when dropdown changes and on initial render 
    

    //function called on submition of the html form 
    const markerUpdateSubmitHandler =  async (event) =>{   
        
        const url = `http://localhost:5000/api/places/upload/${placeName}`;  
       
        try{
        const fd = new FormData();
        fd.append('description', loadedPlace);
        fd.append('image', file);

        const requestOptions = {
            method: 'POST',
            body:fd
        }

        await fetch(url,requestOptions);
        }catch(err){

        };
    
    }
    
    return(
        <div className = "updateDiv">
        <form className = "updateForm" onSubmit={markerUpdateSubmitHandler}>

            <div className = "selectComponent">
                <Selection selection = {setPlaceName}></Selection>   
            </div>
            <div className = "descriptionUpdate">

            <div className = "box1">
            <Input 
            element = "textbox" 
            type = "text" 
            label = "Description" 
            errorText = "No description provided, add one if needed."
            validators = {[VALIDATOR_MINLENGTH(1)]}   
            initialValue = {loadedPlace}
            updater = {setLoadedPlace}
            />
            </div>
           
            </div>
            
            <div>
            <ImageUpload imageMove = {setFile}></ImageUpload>
            </div>
           
            <div className = "submit-Btn">
                <Button disabled = {false} type = "submit" text = "Update Marker"></Button>
            </div>

        </form>
        </div>
    )
}


/*
let fileRead;
        event.preventDefault();
        if(file){             
            console.log(file);
        }

        //getting encoded data of image file 
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            console.log("logging from onloadend");
            fileRead = reader.result;
        };
        reader.onerror = () =>{
            console.error("error occured with data url");
        };

        try{
            await fetch('http://localhost:5000/api/places/upload',{
                method: 'POST',
                body: JSON.stringify({data: fileRead }),
                headers: { 'Content-Type': 'application/json' },  //NEEDED THIS !!!!
            }
            );
        }catch(err){
            console.log("there is a problem with the fetch",err);
        }

        
        /*
        //sending the description off to the backend 
        try{
            await fetch(
                `http://localhost:5000/api/places/${placeName}`,
                {
                    method: 'PATCH',
                    body: {
                        "description": newDescription
                    }
                }
            );   
        }catch(err){
            console.log(err);
        }
         */

