import React, {useRef, useState, useEffect} from 'react'
import Button from './Button'

const ImageUpload = props =>{

    const[file,setFile] = useState();    //file under state
    const[previewUrl, setPreviewUrl] = useState();    //preview url for frontend 
    const[isValid, setIsValid] = useState(false);


    const filePickerRef = useRef();

    //on a new file upload execute, here we are just previewing the file 
    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();   //built into js 
        fileReader.onload = () =>{
            setPreviewUrl(fileReader.result);  //set preview url
        };        //execute on new file 
        fileReader.readAsDataURL(file); 
    },[file])


    //executed on file change -> use event to get file 
    const pickedHandler = event =>{   //want to preview and pass on file
        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files && event.target.files.length !== 0){  //were we get the file 
            pickedFile = event.target.files[0];    //grabbing 1 file
            setFile(pickedFile);   //change state 
            setIsValid(true);
            fileIsValid = true;
            props.imageMove(pickedFile);   //the image file 
        }else{
            setIsValid(false);
            fileIsValid = false;
        }
        //props.onInput(props.id, pickedFile, fileIsValid);  //expect a function here 
    }

    const pickImageHandler = () =>{
        filePickerRef.current.click(); //opens file picker
    }
    //first file check done here
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