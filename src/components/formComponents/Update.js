import React, { useEffect, useContext } from 'react'
import './update.css'
import {useState} from 'react'
import Input from './Input';
import Button from './FormButton'
import Selection from './Selection'
import { VALIDATOR_MINLENGTH } from '../../utils/validators'
import ImageUpload from './ImageUpload'
import { AuthContext } from '../general/context/auth-context';
import LoadingSpinner from '../general/LoadingSpinner';
//THIS PAGE DEALS WITH UPDATING MAP COMPONENTS IT GENERATES A TEXTBOX AND IMAGE UPLOAD BUTTON WITH A SUBMIT FOR BUTTON
export default function Update(){

    const [placeName,setPlaceName] = useState("Lake Leonard");  
    const [loadedPlace, setLoadedPlace] = useState("");              //default value of textBox
    const[file,setFile] = useState([]); 
    const auth = useContext(AuthContext);
    const[isLoading,setIsLoading] = useState(false);    //controls the loading spinner

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
        event.preventDefault(); //NEEDTHIS
        setIsLoading(true);
        //NOTE USING PROTECTED ROUTE HERE, WE MUST PROVIDE A TOKEN!!!, or this request wont work -> check backend code
        const url = `http://localhost:5000/api/places/upload/${placeName}`;  
    
        try{
        const fd = new FormData();
        fd.append('description', loadedPlace);
        console.log(file);

        for(var x = 0; x<file.length; x++){  //loop through file array and attach files to form data
            fd.append('image', file[x]);
        }

        const requestOptions = {
            method: 'POST',
            body:fd,
            headers:{Authorization: 'Bearer ' + auth.token}     //attatch token, retrieved from context 
        }
        //Authorization: 'Bearer' + auth.token
        await fetch(url,requestOptions);
        }catch(err){

        };
        setIsLoading(false);
    }
    
    return(
        <div className = "updateDiv">
        <div className = "formDiv">
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

            {isLoading && <LoadingSpinner asOverlay/>}

        </form>
        </div>
        </div>
    )
}


