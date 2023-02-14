import "../styles/atlas.css"
import section1 from "../devInfo/gsf.json"
import section2 from "../devInfo/llucianLake.json"
import lakeMarker from '../navImages/lakeIcon.webp'
import AtlasMarkerComponent from "./AtlasMakrerComponent"
import {useEffect, useState} from 'react'
export default function Atlas(props){

    const great_shadeck_forest = section1;
    const llucianLake = section2;


    return (
            <div className = "buttonDiv">
                <div className = "header1">
                    <button className = "headerBtn" onClick = {() => {props.layerController("Great Shadeck Forest")} }>Great Shadeck Forest</button>
                    {great_shadeck_forest.map((loc) =>(
                    <AtlasMarkerComponent key = {loc.feature} title = {loc.feature} ></AtlasMarkerComponent>
                    ))}
                </div>

                <div className = "header2">
                    <button className = "headerBtn">LLucian Lake</button>
                    {llucianLake.map((loc) =>(
                    <AtlasMarkerComponent key = {loc.feature} title = {loc.feature}></AtlasMarkerComponent>
                    ))}

                </div>
                
             </div>
    )
}