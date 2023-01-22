import {MapContainer,TileLayer, Marker, Popup, useMap, LayerGroup, Circle, CircleMarker} from 'react-leaflet'
import L, { map, marker } from 'leaflet'
import {useRef, useEffect, useState} from 'react'
import cavernMarker from '../navImages/cavern.webp'
import lakeMarker from '../navImages/lakeIcon.webp'
import forestMarker from '../navImages/forestIcon.webp'
import mountainMarker from '../navImages/mountainIcon.png'

import LeftSearch from './leftSearch'
import MapButtons from './MapButtons'
import Atlas from './Atlas'
import '../styles/mapdisplay.css'
import Data from '../devInfo/mapLocations'
//This component displays the react leaflet map 

function MapDisplay(props){

    const markerRefs = useRef({});   //give useRef an array 
    const layerGroup = useRef();
    const testLayer = useRef();
    const [clickedMarker, setMarker] = useState();
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
        console.log(testRef.current);
    }, [testRef])

     //utilizes react leaflet events 
     const markerClick = (test) =>{
       setMarker(test);
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
            
                <Marker
                        id = "Lake Leonard"
                        icon = {lakeIcon} 
                        position={[-28, 80]} 
                        ref = {(ref)=>{
                             markerRefs.current["Lake Leonard"] = ref;
                        }} 
                        eventHandlers={{
                            click: (e) => {
                              markerClick("Lake Leonard");
                            }
                        }}
                    >
                    <Popup>
                        <h2>Lake Leonard</h2>
                        <img src = {"https://res.cloudinary.com/dog5jmb4w/image/upload/v1666634868/SDImageFolder/LakeLeonard_milnsc.png"} alt = "Lake Leonard">
                        </img>
                        <p>    
                        Lenny, and Leonard when he does listen was originally 
                        christened Waffles by the pope or whomever runs that homeless 
                        shelter for cats they call the Humane Society. Leonard is now in
                         residence \nnumber three since I got him.  He does not adjust quickly! 
                        But he is a good boy and I love him as much as I can love a cat.(which is actually quite a bit)
                        </p>
                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[15,-25]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[69,109]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[65,110]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[60,90]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[55,90]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[51,90]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[25,90]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[20,104]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[23,75]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[20,65]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>

                <Marker
                    icon = {lakeIcon}
                    position = {[5,85]}
                    ref = {(ref)=>{
                        markerRefs.current["Lake Evan"] = ref;
                   }} 
                   eventHandlers={{
                    click: (e) => {
                      markerClick("Lake Evan");
                    }
                }}
                >
                    <Popup>
                    <h2>Lake Evan</h2>
                        <p>    
                            testing
                        </p>

                    </Popup>
                </Marker>
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