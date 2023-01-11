import "../styles/atlas.css"
import section1 from "../devInfo/gsf.json"
import section2 from "../devInfo/llucianLake.json"
import lakeMarker from '../navImages/lakeIcon.webp'
export default function Atlas(props){

    const great_shadeck_forest = section1;
    const llucianLake = section2;

    return (
            <div className = "buttonDiv">
                <div className = "header1">
                    <button className = "headerBtn">Great Shadeck Forest</button>

                    {great_shadeck_forest.map((loc) =>(
                    <p className = "h1Regions">
                        {loc.feature}
                        <img className = "barImg" src = {lakeMarker} width = "20px" height = "20px" alt = "fallback"></img>
                    </p>
                    

                    ))}
                </div>

                <div className = "header2">
                    <button className = "headerBtn">LLucian Lake</button>
                    {llucianLake.map((loc) =>(
                    <p className = "h1Regions">
                        {loc.feature}
                    </p>
                    ))}

                </div>
                
             </div>
    )
}