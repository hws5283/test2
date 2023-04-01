import React, {useRef, useState, useEffect} from 'react'
import '../../styles/imageupload.css'
import Button from './FormButton'
const ImageUpload = props =>{

    const[file,setFile] = useState([]);    //files under state
    const[previewUrl, setPreviewUrl] = useState([]);    //preview urls for frontend 
    const filePickerRef = useRef();

    //executed on file change on the html input 
    const pickedHandler = event =>{   

        const files = event.target.files[0];

        const reader = new FileReader();
            reader.onload = ()=>{
            setPreviewUrl([...previewUrl,reader.result]);   //add to url preview array (previewUrl)
        };  
        reader.readAsDataURL(files);

        props.reducer({
            type: "IMAGE_CHANGE",
            formFiles: ([...file,files])
        })
        setFile([...file,files]);   //add to files array
    }

    const removeImageHandler = ()=>{
        const prevArrayCopy = [...previewUrl];
        prevArrayCopy.splice(-1);
        setPreviewUrl(prevArrayCopy);

        const fileArray = [...file];
        fileArray.splice(-1);
        console.log(fileArray);
        setFile(fileArray)

        props.reducer({
             type:"REMOVE_IMAGE",
             formFiles: (fileArray)
        })

    }

    const test = ()=>{
        console.log(previewUrl);
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
                <div className = "previewImgs">
                {previewUrl &&
                previewUrl.map((element, index)=>(
                    <div className = "image-upload-preview">
                    {element &&<img src = {element} key = {index} alt = "preview"></img>}
                    {!previewUrl && <p>Please pick an image</p>}
                     </div>
                ))
                }
                </div>
            </div>


            <Button type = "button" onClick = {removeImageHandler} text = "-"></Button>
            <Button type = "button" onClick = {pickImageHandler} text = "+"></Button>
            <Button type = "button" onClick = {test} text = "Test"></Button>
        </div>
    )
}

export default ImageUpload;