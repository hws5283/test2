import React from 'react'
import './popup.css'

function PopupContent(props){

    return(
        <div className ="content-div">
        <div className = "displayImages-grid">
      
         {props.activeMarker.img &&
            props.activeMarker.img.map((element)=>(
                <div className = "imgComponent">
                <img  className = "popUpimg"src={element} alt= "marker resource"></img>
                </div>
            ))
            
         }
         </div>
        <div>
         <h1>{props.activeMarker.title}</h1>
        </div>
        <div className = "description-body">
            <p className = "description-body-p">
                {props.activeMarker.description}
            </p>
        </div>
        {props.activeMarker.link &&
        <div className = "link-data">
            {props.activeMarker.link &&
                props.activeMarker.link.map((element)=>(
                    <div>
                    <a href = {element}>More Information About {props.activeMarker.title} </a>
                    <br></br>
                    </div>
                ))
            }
        </div>
        }
        </div>   
    )
}

export default PopupContent;