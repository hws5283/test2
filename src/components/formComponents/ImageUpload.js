import React, {useRef, useState, useEffect} from 'react'
import Button from './FormButton'

const ImageUpload = props =>{

    const[file,setFile] = useState();    //file under state
    const[previewUrl, setPreviewUrl] = useState();    //preview url for frontend 
    const[isValid, setIsValid] = useState(false);


    const filePickerRef = useRef();

    
    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();   
        fileReader.onload = () =>{
            setPreviewUrl(fileReader.result);  
        };        //execute on new file 
        fileReader.readAsDataURL(file); 
    },[file])



    //executed on file change on the html input 
    const pickedHandler = event =>{   
        setFile(event.target.files[0]);
        props.imageMove(event.target.files[0]);
    }

    //
    const pickImageHandler = () =>{
        filePickerRef.current.click(); //opens file picker
    }
  
    return(
        <div className = "form-control">
            <input 
                ref = {filePickerRef}
                id = {props.id} 
                type = "file" 
                style = {{display: 'none'}}
                accept = ".jpg,.png,.jpeg"
                onChange = {pickedHandler}
            />

            <div className = "image-upload">
                <div className = "image-upload-previed">
                    {previewUrl &&
                    <img src = {previewUrl} alt = "preview"></img>
                    }
                    {!previewUrl && <p>Please pick an image</p>}
                    </div>

                <Button type = "button" onClick = {pickImageHandler} text = "Upload Image"></Button>

            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )

}


export default ImageUpload;