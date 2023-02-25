import React, {useState} from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import Data from '../../devInfo/updateLocations.json'
import '../../styles/selection.css'

export default function Selection(props){

    const changePointSelection = (e) =>{
       props.selection(e.target.value);     //pass to update component the current selection 
    }

    return(
        <div className = "dropDown" >
                <select className = "selectOption" onChange={changePointSelection}>
                    {
                        Data.map((optionItem)=>(
                            <option>{optionItem.location}</option>
                        ))
                    }
                </select>
            </div>
    )
}