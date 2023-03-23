import React from 'react'
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from 'react'
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

    //Finds the height of the current window
    const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 88);
    const { isMinimized, setIsMinimized } = props;
    const [searchWidth, setSearchWidth] = useState((window.innerWidth > 1200 && isMinimized) ? 320 : 30);
    // Updates the component when the window is resized
    useEffect(() => {
        const handleResize = () => {
          setScrollHeight(window.innerHeight - 88);
          setSearchWidth((window.innerWidth > 1200 && (isMinimized)) ? 320 : 30);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [isMinimized]);

    //passed to search component 
    const searchInputHandler = inputChild => {

        //set input of user 
       // setInput(inputChild);

       if(inputChild === ""){
        setMatch(buttonTitles);
       }
       else{
            const results = buttonTitles.filter((entry) => {
            return entry.location.toLowerCase().includes(inputChild.toLowerCase());
            })
            setMatch(results);
        }
    }

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized);
      };

    return(
        
        <div className = "leftSearch">  
        { (window.innerWidth > 1200) ? (//if window is big enough to show search bar
        <div className = "test3">
            
             <Search
                onInputChange = {searchInputHandler}
             />
             <div className = "leftbuttonDiv">
                {match.sort((a, b) => a.location.localeCompare(b.location)).map((loc) =>(
                    <ButtonComp
                        key = {loc.location}
                        label = {loc.location}
                        buttonEvent = {props.eventFunction}
                    />
                ))}
             </div>
        </div> )
        : (//if window is too small to show search bar
        <div className="test4">
            <button onClick={toggleMinimized} style={{ width:'100%'}}>☰</button>
            {!isMinimized && (
            <Search
            onInputChange = {searchInputHandler}
            />)}
        <div className="leftbuttonDiv" >
          {!isMinimized && (
            match
              .sort((a, b) => a.location.localeCompare(b.location))
              .map((loc) => (
                <ButtonComp key={loc.location} label={loc.location} buttonEvent={props.eventFunction} />
              ))
          )}
        </div>
      </div>
    )}
  </div> //END MAIN DIV
    )
}

export default LeftSearch;

    //const inputRef = useRef();
    //const position = [9, -22];
    //const tileUrl = '../cuts/{z}/{x}/{y}.png';

    //const mapRef = useRef(null); //map reference 
    //const markerRefs = useRef({});   //ref array ***



    //parameter "title" is text of each button 
    //better to define these functions not inline 
    //const clickHandler =(title) =>{       //called by buttons not the components 

      //  inputRef.current.value = title;  //set input field to button click using hook 
      //  const markerToOpen = markerRefs.current[title]; //the marker ref
      //  const myMap = mapRef.current;           //map ref - ALWAYS THE SAME
      //  if (markerToOpen){
        //     markerToOpen.openPopup();           //show the popup display 
       // }

       // if (!myMap) {
      //      return
      //  }
    
      //  myMap.flyTo(markerToOpen.positionX,markerToOpen.positionY);   //use current marker x and y 
        
   // }




