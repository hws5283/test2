import React, {useRef, useState, useEffect} from 'react'
import '../../styles/imageupload.css'
const ImageUpload = props =>{

    const[file,setFile] = useState([]);    //files under state
    const[previewUrl, setPreviewUrl] = useState([]);    //preview urls for frontend 
    const[isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();
    const[index,setIndex] = useState(0);
/*
    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();   
        fileReader.onload = () =>{
            setPreviewUrl(state=>[...state, fileReader.result]);
        };        //execute on new file 
        fileReader.readAsDataURL(file[index]); 
    },[file,index])  //only call when file changes 
*/
    //executed on file change on the html input 
    const pickedHandler = event =>{   

        const files = event.target.files[0];

        const reader = new FileReader();
            reader.onload = ()=>{
            setPreviewUrl([...previewUrl,reader.result]);   //add to url preview array 
        };  
        reader.readAsDataURL(files);
    
        setFile([...file,files]);   //add to files array
        props.imageMove([...file,files]);   //add to update component files 
    }

    const pickImageHandler = () =>{
        filePickerRef.current.click(); //opens file picker
    }
  
    return(
        <div className = "formImage">
            <input 
                ref = {filePickerRef}
                id = {props.id} 
                type = "file" 
                style = {{display: 'none'}}
                accept = ".jpg,.png,.jpeg"
                onChange = {pickedHandler}
            />

            <div className = "image-upload">
                {previewUrl &&
                previewUrl.map((element, index)=>(
                    <div className = "image-upload-preview">
                    {element &&<img src = {element} key = {index} alt = "preview"></img>}
                    {!previewUrl && <p>Please pick an image</p>}
                     </div>
                ))
                }
            </div>

            <button type = "button" onClick = {pickImageHandler}>Upload Image</button>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload;