import React, { useEffect } from 'react'
import '../styles/update.css'
import Data from '../devInfo/mapLocations'
import useState from 'react'
export default function Update(){

    return(
        <form action = "">
            <div className = "updateDiv">
            <div className = "pointOption">
                <select className = "selectOption">
                    {
                        Data.map((optionItem)=>(
                            <option>{optionItem.location}</option>
                        ))
                    }
                </select>
            </div>
            <div className = "description-update">
            <div>
                <label for ="description-area">Point Description:</label>
            </div>
            <div className = "description-text-area">
                <textarea id = "description-area" name = "descInput">Enter New Description Here</textarea>
            </div>
            </div>
            <div className = "updateButton">
                <input type = "submit" value = "Update Point"></input>
            </div>
            </div>
        </form>
    )
}