import React from 'react'
import "leaflet/dist/leaflet.css"
import { useState } from 'react'
import "../styles/LeftSearch.css"
import {useRef} from 'react'
import Search from "./Search"
import ButtonComp from "./ButtonComp"
//this component displays the search bar and the generated button list beneath it 
const LeftSearch = (props) => {

    //always holds the full list of locations 
    const buttonTitles = props.locations;
    //VALUE OF SEARCH BAR - input holds data submited by user in the search component 
   // const [input,setInput] = useState('');

   //WANT THIS STATE TO CAUSE RE-EVALUATION OF COMPONENT
    const [match, setMatch] = useState(buttonTitles);

    //passed to search component 
    const searchInputHandler = inputChild => {

        //set input of user 
       // setInput(inputChild);

       if(inputChild === ""){
        setMatch(buttonTitles);
       }
       else{
            const results = buttonTitles.filter((entry) => {
            return entry.location.toLowerCase().startsWith(inputChild.toLowerCase());
            })
            setMatch(results);
        }
    }

    return(
        <div className = "leftSearch"> 
        <div className = "test3">
             <Search
                onInputChange = {searchInputHandler}
             />
             <div className = "leftbuttonDiv">
                {match.map((loc) =>(
                    <ButtonComp
                        key = {loc.location}
                        label = {loc.location}
                        buttonEvent = {props.eventFunction}
                    />
                ))}
             </div>
        </div>
    </div> //END MAIN DIV
    )
}

export default LeftSearch;





