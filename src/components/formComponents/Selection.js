import React, {useState} from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import Data from '../../devInfo/mapLocations'

export default function Selection(props){

    const changePointSelection = (e) =>{
       props.selection(e.target.value);     //pass to update component the current selection 
    }

    return(
        <div >
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