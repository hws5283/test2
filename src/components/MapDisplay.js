import {MapContainer,TileLayer, Marker, Popup, useMap, LayerGroup, Circle, CircleMarker, LayersControl} from 'react-leaflet'
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
    const ShadeckForestLayer = useRef();
    const [clickedMarker, setMarker] = useState();
    const[isLoading, setIsLoading] = useState(false);   //loading state
    const[loadedMarks, setLoadedMarks] = useState([]);    //loaded marker data
    const[error,setError] = useState();
    const[showLayer, truthy] = useState(false);
    const[mapHeight, setMapHeight] = useState(window.innerHeight - 48);
    const [isMinimized, setIsMinimized] = useState(true);
    const[mapWidth, setMapWidth] = useState(window.innerWidth < 1200 ? 
        (isMinimized ? window.innerWidth - 40 : window.innerWidth - 320) : 
        window.innerWidth - 689);

    //source of map images
    const tileUrl = '../cuts/{z}/{x}/{y}.png';


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
    },[]);   //only called when page renders, no dependencies to call this again

    //the map ref
    const testRef= useRef();
    const center = [0,0];
    const fillBlueOptions = { Color: 'blue'};
    const southWest = L.latLng(-200, -180);
    const northEast = L.latLng(200, 180);
    const bounds = L.latLngBounds(southWest, northEast);


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
        console.log(title);
        const markerToOpen = markerRefs.current[title]; //the marker ref of specific value of button clicked
        if (markerToOpen){
             markerToOpen.openPopup();           //show the popup display 
        }
    }

    //Updates the size of the map when the window is resized
    const widthThreshold = 1200;
    useEffect(() => {
        const handleResize = () => {
            const newWidth = 
                window.innerWidth < widthThreshold ? 
                (isMinimized ? window.innerWidth - 40 : window.innerWidth - 320) : 
                window.innerWidth - 689;
            setMapHeight(window.innerHeight - 48);
            setMapWidth(newWidth);
            window.location.reload();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMinimized]);
    

    //center map, function passed as prop to mapButtons
    const centerHandler = () => {
       testRef.current.flyTo(center, 2.5, {duration:1}); 
    }

    //zoom to max zoom level
    const zoomInHandler = () =>{
        testRef.current.setZoom(4);
    };

    //zoom out to lowest zoom level 
    const zoomOutHandler= () =>{
        testRef.current.setZoom(2);
    }
   
    //called to open raster cirlce layer for areas of map 
    const testLayerFunction = (buttonTitle) =>{
       
    }
    /*
        <Circle center = {[5,-110]} pathOptions = {fillBlueOptions} radius = {2000000}></Circle>
        <Circle center = {[33,60]} pathOptions = {fillBlueOptions} radius = {4000000}></Circle>
        <Circle center = {[50,-80]} pathOptions = {fillBlueOptions} radius = {3000000}></Circle>
        
    */
    return(

    <div className = "mainDiv" data-testid = "mapDisplay-1" style={{ height:mapHeight }}>
        <div>
            <LeftSearch 
                data-testid = "leftSearch-1" 
                locations = {Data} eventFunction = {clickHandler} 
                isMinimized={isMinimized} 
                setIsMinimized={setIsMinimized}
            ></LeftSearch>
        </div>
        <div className = "mapDisplay">    
        {/*responsible for creating map instance and providing to child components, props used as map options  */
        //NOTE - react leaflet is providing mapping to leaflet js with the use of components MUST LOOK AT BOTH DOCUMENTATIONS
        }
            <MapContainer
                className = "map-container"
                ref = {testRef}
                maxBounds = {bounds}
                center={[0,0]} 
                zoom={3} 
                scrollWheelZoom={true} 
                style = {{height: mapHeight, width: mapWidth}}
               >

                {showLayer &&
                    <Circle ref = {ShadeckForestLayer} center = {[-20,15]} pathOptions ={fillBlueOptions} radius = {4600000}>
                        <Popup>
                            One of the predominant features on the map is my surname.  
                            Those closest to me; for the longest periods of time are adjacent
                            to the Great Shadeck Forest or they are Munsoned in the Middle of Nowhere.
                            I’m not certain that every geologic feature has relevance.  
                            But the forest is relevant to me. I love the woods.
                            Some of my favorite memories as a child were walking with my dad in Scott 
                            Park or exploring Frontier Park and the Bayfront on my own starting at a very young age.  
                            I remember on one particular walk as a late adolescent when I was attempting to get out 
                            of going to church on a regular basis.  I tried to explain to my father that I did not 
                            feel it was fair that I had to go to Sunday School and Church; but he never went.  
                            His quick response was “I go to church every time I step into the woods”
                            Now at the time I think he was just trying to find a handy parental excuse as to why 
                            I had to do what he said but not what he did.  
                            In retrospect his smart ass answer has become a personal philosophy for me that has 
                            greatly impacted my life and is one of the reasons I am generally a happy person.
                        </Popup>
                    </Circle>
                }                   
    
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
                <Popup maxWidth = {"auto"} maxHeight = {500} minWidth = {500}>
                    <div className ="content-div">
                    <div className = "displayImages">
                     {location.img &&
                        location.img.map((element)=>(
                            <div className = "image">
                            <img src={element} alt= "marker resource"></img>
                            </div>
                        ))
                     }
                     </div>
                 
                    <div>
                     <h1>{location.title}</h1>
                    </div>
                    <div className = "description-body">
                        <p className = "description-body-p">
                            {location.description}
                        </p>
                    </div>
                    {location.link &&
                    <div className = "link-data">
                        {location.link &&
                            location.link.map((element)=>(
                                <a href = {element}>More Information About {location.title} </a>
                            ))
                        }
                    </div>
                    }
                    </div>
                   
                </Popup>
                </Marker>   
                ))
                }  
            
           </MapContainer>
        </div> 
        { (window.innerWidth > widthThreshold) &&  
        <div>
            <div data-testid = "mapButtons-1">
                 <MapButtons activation = {centerHandler} activation2 = {zoomOutHandler} activation3 = {zoomInHandler}></MapButtons>
            </div>
            <div>
                 <Atlas activeMarker = {clickedMarker} layerController = {testLayerFunction} ></Atlas>
            </div>
        </div> 
        }   
        </div>
    )
}

export default MapDisplay;