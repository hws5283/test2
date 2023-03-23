import "../styles/atlas.css"
import section1 from "../devInfo/gsf.json"
import section2 from "../devInfo/dd.json"
import AtlasMarkerComponent from "./AtlasMakrerComponent"
import LakeIcon from "../navImages/lakeIconUse.png"
import {useEffect, useState} from 'react'
import "../styles/atlasbuttons.css"
export default function Atlas(props){

    const great_shadeck_forest = section1;
    const daves_desert = section2

    return (
            <div className = "buttonDiv">
                <div className = "header1">
                    <div className = "contentDiv">
                    <button className = "headerBtn" onClick = {() => {props.layerController("Great Shadeck Forest")} }>Great Shadeck Forest</button>
                    </div>
                    {great_shadeck_forest.sort((a, b) => a.feature > b.feature).map((loc) =>(
                    <AtlasMarkerComponent key = {loc.feature} styleInfo = {"h1Regions"} title = {loc.feature} img = {LakeIcon}></AtlasMarkerComponent>
                    ))}
                </div>

                <div className = "header2">
                    <div className = "contentDiv">
                    <button className = "headerBtn-davesDesert" onClick={() =>{props.layerController("LLucian Lake")}}>Dave's Desert</button>
                    </div>
                    {daves_desert.sort((a, b) => a.feature > b.feature).map((loc) =>(
                    <AtlasMarkerComponent key = {loc.feature} styleInfo = {"h2Regions"} title = {loc.feature} img={LakeIcon}></AtlasMarkerComponent>
                    ))}

                </div>
                
             </div>
    )
}