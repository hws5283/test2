import React, {useState,useReducer, useEffect} from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import Data from '../../devInfo/updateLocations.json'
import '../../styles/selection.css'

export default function Selection(props){

   const changeHandler = (event)=>{
      props.reducer({
        type: "SELECTION_CHANGE",
        value: event.target.value
      })
   }
    
    return(
        <div className = "dropDown" >
                <select className = "selectOption" onChange={changeHandler}>
                    {
                        Data.map((optionItem)=>(
                            <option key = {optionItem.location} >{optionItem.location}</option>
                        ))
                    }
                </select>
            </div>
    )
}