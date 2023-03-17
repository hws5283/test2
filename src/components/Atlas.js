import "../styles/atlas.css"
import section1 from "../devInfo/gsf.json"
import section2 from "../devInfo/llucianLake.json"
import AtlasMarkerComponent from "./AtlasMakrerComponent"
import LakeIcon from "../navImages/lakeIconUse.png"
import {useEffect, useState} from 'react'
export default function Atlas(props){

    const great_shadeck_forest = section1;
    const llucianLake = section2;


    return (
            <div className = "buttonDiv">
                <div className = "header1">
                    <button className = "headerBtn" onClick = {() => {props.layerController("Great Shadeck Forest")} }>Great Shadeck Forest</button>
                    {great_shadeck_forest.map((loc) =>(
                    <AtlasMarkerComponent key = {loc.feature} title = {loc.feature} img = {LakeIcon}></AtlasMarkerComponent>
                    ))}
                </div>

                <div className = "header2">
                    <button className = "headerBtn" onClick={() =>{props.layerController("LLucian Lake")}}>LLucian Lake</button>
                    {llucianLake.map((loc) =>(
                    <AtlasMarkerComponent key = {loc.feature} title = {loc.feature}></AtlasMarkerComponent>
                    ))}

                </div>
                
             </div>
    )
}