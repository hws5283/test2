import "../styles/atlas.css"
import section1 from "../devInfo/gsf.json"
import section2 from "../devInfo/llucianLake.json"
import section3 from "../devInfo/davesDesert.json"
import lakeMarker from '../navImages/lakeIcon.webp'
import AtlasMarkerComponent from "./AtlasMakrerComponent"
import HeaderComponent from "./AtlasHeaderComponent"
import {useEffect, useState} from 'react'
export default function Atlas(props){

    const great_shadeck_forest = section1;
    const llucianLake = section2;
    const davesDesert = section3;

    //Finds the height of the current window
    const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 168);

    //Updates the height of the window when the window is resized
    window.addEventListener('resize', () => {
        setScrollHeight(window.innerHeight - 168);
    });


    return (
        <div className="buttonDiv" style={{ height: scrollHeight }}>
        <HeaderComponent
          className="header1"
          onClick={() => props.layerController("Great Shadeck Forest")}
          title="Great Shadeck Forest"
          locations={great_shadeck_forest.sort((a, b) =>
            a.feature.localeCompare(b.feature)
          )}
        />
        <HeaderComponent
          className="header2"
          title="LLucian Lake"
          locations={llucianLake.sort((a, b) =>
            a.feature.localeCompare(b.feature)
          )}
        />
        <HeaderComponent
            className="header3"
            title="Dave's Desert"
            locations={davesDesert.sort((a, b) =>
                a.feature.localeCompare(b.feature)
            )}
        />
      </div>
    )
}