import "../styles/atlas.css"
import section1 from "../devInfo/gsf.json"
import section2 from "../devInfo/llucianLake.json"
import lakeMarker from '../navImages/lakeIcon.webp'
import AtlasMarkerComponent from "./AtlasMakrerComponent"
import {useEffect, useState} from 'react'
export default function Atlas(props){

    const great_shadeck_forest = section1;
    const llucianLake = section2;

    const [viewMarker, setActive] = useState('');

    useEffect(() => {
        if(props.activeMarker === ''){
            console.log('no active marker');
        }
        else{
            setActive(props.activeMarker);
        }
    }, [props.activeMarker])

    //creates circle to deleniate areas of the map - users can click these indicators for desc of the area
    const DrawCircle = (areaTitle) =>{
        props.circleTest(areaTitle);
    };

    const testing = (test) =>{
        console.log("logging from atlas component");
        console.log(test);
    }

    let activeMarker = props.displayMarker;   //the active marker 

    return (
            <div className = "buttonDiv">
                <div className = "header1">
                    <button className = "headerBtn" onClick = {() =>{testing(props.activeMarker)}}>Great Shadeck Forest</button>
                    {great_shadeck_forest.map((loc) =>(
                    <AtlasMarkerComponent key = {loc.feature} title = {loc.feature} activeTest = {viewMarker}></AtlasMarkerComponent>
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