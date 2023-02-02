import {MapContainer,TileLayer, Marker, Popup, useMap, LayerGroup, Circle, CircleMarker} from 'react-leaflet'
import L, { map, marker } from 'leaflet'
import {useRef, useEffect, useState} from 'react'
import lakeMarker from '../navImages/lakeIcon.webp'
import LeftSearch from './leftSearch'
import MapButtons from './MapButtons'
import Atlas from './Atlas'
import '../styles/mapdisplay.css'
import Data from '../devInfo/mapLocations'
//This component displays the react leaflet map 
//markers positions -> y,x for correct positions 

function MapDisplay(props){

    const markerRefs = useRef({});   //give useRef an array 
    const layerGroup = useRef();
    const testLayer = useRef();
    const [clickedMarker, setMarker] = useState();
    const[isLoading, setIsLoading] = useState(false);   //loading state
    const[loadedMarks, setLoadedMarks] = useState([]);    //loaded marker data
    const[error,setError] = useState();

    useEffect(()=>{
        const sendGetLocations = async () =>{
            setIsLoading(true); //currently loading from db....
            try{
                const response = await fetch('http://localhost:5000/api/places/');   //default in a get request*, javascript fetch()
                const responseData = await response.json();  //convert to json 
                if(!response.ok){
                    console.log("error loading map data");
                }
                else{
                    //we got a response...
                    console.log(responseData);
                }
                setLoadedMarks(responseData.mapPlaces);  //set loaded marker data, "mapPlaces array", triggering useState here ->reload page 
            }catch(err){
                setError(err.message);   //set the error 
            }
            setIsLoading(false);  //finished loading 
        }
        sendGetLocations();   //call the function  **
    },[]);   //only called when page renders 

    //the map ref
    const testRef= useRef();
    const center = [0,0];
    const fillBlueOptions = { Color: 'blue'};
    const bounds = [
        [100,-185],
        [-100, 185],
    ]

    //source of map images
    const tileUrl = '../cuts/{z}/{x}/{y}.png';

    const lakeIcon = new L.Icon({
        iconUrl:lakeMarker,
        iconSize:[26,26]
    });


    //hook executes after component renders -> function is our "effect"
    useEffect(()=>{
        console.log("use effect other called ");
    }, [testRef])
    

     //utilizes react leaflet events 
     const markerClick = (test) =>{
       //setMarker(test);
       console.log(test);
     }

    //handles button clicks from leftsearch component (function passed as prop)
    //ultimately calls in button components reaches here
    //react leaflet automatically pans to these markers on activation 
    const clickHandler = (title) =>{
        const markerToOpen = markerRefs.current[title]; //the marker ref of specific value of button clicked
        if (markerToOpen){
             markerToOpen.openPopup();           //show the popup display 
             console.log("its updating");
        }
    }

    //center map
    const centerHandler = () => {
       testRef.current.flyTo(center, 2, {duration:2}); 
    }

    //zoom to max zoom level
    const zoomInHandler = () =>{
        testRef.current.setZoom(4);
    };

    //zoom out to lowest zoom level 
    const zoomOutHandler= () =>{
        testRef.current.setZoom(2);
    }
   
    const testLayerFunction = () =>{
        layerGroup.current.removeLayer(testLayer.current);
    }
    /*
        <Circle center = {[5,-110]} pathOptions = {fillBlueOptions} radius = {2000000}></Circle>
        <Circle center = {[33,60]} pathOptions = {fillBlueOptions} radius = {4000000}></Circle>
        <Circle center = {[50,-80]} pathOptions = {fillBlueOptions} radius = {3000000}></Circle>
    */

    return(

    <div className = "mainDiv">
        <div>
            <LeftSearch locations = {Data} eventFunction = {clickHandler}></LeftSearch>
            <button onClick = {()=>{testLayerFunction()}}>testing</button>
        </div>
        <div className = "mapDisplay">    
        {/*responsible for creating map instance and providing to child components, props used as map options  */
        //NOTE - react leaflet is providing mapping to leaflet js with the use of components MUST LOOK AT BOTH DOCUMENTATIONS
        }
            <MapContainer 
                ref = {testRef}
                maxBounds = {bounds}
                center={[9,-22]} 
                zoom={13} 
                scrollWheelZoom={true} 
                style = {{height: "800px", width: "800px"}}
               >

                <LayerGroup ref = {layerGroup}>
                    <Circle ref = {testLayer} center = {[-20,15]} pathOptions ={fillBlueOptions} radius = {4600000}><Popup>Shadeck Forest Description</Popup></Circle>
                </LayerGroup>
    
                <TileLayer minZoom={2} maxZoom = {4} noWrap = {true}
                    url={tileUrl}
                />

                {!isLoading && loadedMarks && 

                loadedMarks.map((location) => (
                <Marker
                        id = {location.title}
                        key = {location.title}
                        icon = {lakeIcon} 
                        position={[location.yPoint,location.xPoint]} 
                        ref = {(ref)=>{
                             markerRefs.current[location.title] = ref;
                        }} 
                        eventHandlers={{
                            click: (e) => {
                              markerClick(location.title);
                            }
                        }}
                >
                <Popup>
                    <div>
                        <h1>{location.title}</h1>
                        <img src = {location.img} alt = "point visual"></img>
                    </div>
                   {location.description}
                </Popup>
                </Marker>   
                ))
            }  
     
           </MapContainer>
        </div>   
        <div>
            <div>
                 <MapButtons activation = {centerHandler} activation2 = {zoomOutHandler} activation3 = {zoomInHandler}></MapButtons>
            </div>
            <div>
                 <Atlas activeMarker = {clickedMarker} ></Atlas>
            </div>
        </div>    
        </div>
    )
}

export default MapDisplay;