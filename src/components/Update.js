import React, { useEffect } from 'react'
import '../styles/update.css'
import {useState} from 'react'
import { useParams } from 'react-router-dom';
import Input from './formComponents/Input';
import Button from './formComponents/Button';
import Selection from './formComponents/Selection'
import { VALIDATOR_MINLENGTH } from '../utils/validators'
import ImageUpload from './formComponents/ImageUpload'
export default function Update(){

    //FORM FOR ALTERING MAP COMPONENTS 

    const[loading, setLoading] = useState(true);

    const [placeName,setPlaceName] = useState("Lake Leonard");  //keeps track of what point is selected 
    const [newDescription, setDescription] = useState("");
    const [formState,setFormState] = useState(false);    
    const[file,setFile] = useState(null);  //image file 

    const markerUpdateSubmitHandler =  async (event) =>{    //form data includes basic text data and binary image data * -> multer 

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
    }

    //handles data minipulation on image file, called when the form is submitted 
    //NOTE PROBLEM HERE !!!!, FUNCTIONS HAVE A LIMIT TO THE SIZE OF THEIR PASSED FUNCTION PARAMETERS, PARAMETER MAY BE TO LONG !!!
    

    //input1 - change picture,  input2 change description 
    //return the form.. 
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
            //value = {loadedPlace.description}
            validators = {[VALIDATOR_MINLENGTH(1)]}   //checks for no input into description area 
            alter = {setDescription}
            >
            </Input>
            </div>
            <Input 
            element = "textbox" 
            type = "text" 
            label = "Current Description"
            errorText = ""
            validators = {[]}   //checks for no input into description area 
            disabled = {true}
            >
            </Input>
            </div>
            <div className = "uploadComponent">
                <ImageUpload imageMove = {setFile}></ImageUpload>
            </div>

            <div className = "submit-Btn">
                <Button disabled = {false} type = "submit" text = "Update Marker"></Button>
            </div>
           
        </form>
        </div>
    )
}