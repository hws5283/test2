import {MapContainer,TileLayer, Marker, Popup, Circle} from 'react-leaflet'
import L from 'leaflet'
import {useRef, useEffect, useState, useReducer} from 'react'
import TreeIcon from '../navImages/treeIconV2.png'
import MntIcon from '../navImages/mountainIconV2.png'
import OceanIcon from '../navImages/oceanIconClear.png'
import LakeIcon from '../navImages/lakeIconUse.png'
import IceIcon from '../navImages/iceV2.png'
import CoastIcon from '../navImages/coastal.png'
import LeftSearch from './leftSearch'
import MapButtons from './MapButtons'
import Atlas from './Atlas'
import '../styles/mapdisplay.css'
import Data from '../devInfo/mapLocations'
import {useSelector, useDispatch} from 'react-redux';
//This component displays the react leaflet map 
//markers positions -> y,x for correct positions 

function MapDisplay(props){

    const markerRefs = useRef({});   //give useRef an array 
    const [clickedMarker, setMarker] = useState(null);     //the current marker the user clicked***
    const[isLoading, setIsLoading] = useState(false);   //loading state
    const[loadedMarks, setLoadedMarks] = useState([]);    //loaded marker data
    const[showLayerGSF, showGSF] = useState(false);
    const[showLayerLake, showLLk] = useState(false);
    const [btnRef,setButtonRef] = useState();
    const dispatch = useDispatch();

    //this effect is responsible for using the api and getting only the coordinates and name of all markers from controller
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
                    console.log("marker data retreived");
                }
                setLoadedMarks(responseData.mapPlaces);  //set loaded marker data, "mapPlaces array", triggering useState here ->reload page 
            }catch(err){
                console.log(err);
            }
            setIsLoading(false);  //finished loading 
        }
        sendGetLocations();   //call the function  **
    },[]);   //only called when page renders, no dependencies to call this again
//-----------------------------------------------------------------------------------------------------------------------------------------

    //utilizes react leaflet events -> function executes when marker is clicked, given name of marker 
    const markerClick = async(markerName) =>{
        try{
            const response = await fetch(`http://localhost:5000/api/places/byname/${markerName}`);   //default in a get request*, javascript fetch()
            const responseData = await response.json();  //convert to json 
            if(!response.ok){
                console.log("error loading the rest of the map data");
            }
            else{
                //we got a response...
                console.log(responseData);
            }
            setMarker(responseData.placebyName);  //set object 
        }catch(err){
            console.log(err);
        }
     }

     //the map ref
    const mapRef= useRef();
    //source of map images
    const tileUrl = '../cutsv2/{z}/{x}/{y}.png';
    const center = [0,0];
    const fillBlueOptions = { color: "orange"};
    const bounds = [
        [600,-500],
        [-100, 200],
    ]

    //map icons 
    const woodSymbol = new L.Icon({
        iconUrl: TreeIcon,
        iconSize:[26,26]
    });

    const mntSymbol = new L.Icon({
        iconUrl: MntIcon,
        iconSize:[26,26]
    });

    const lakeSymbol = new L.Icon({
        iconUrl: LakeIcon,
        iconSize:[26,26]
    });

    const iceSymbol = new L.Icon({
        iconUrl: IceIcon,
        iconSize:[26,26]
    });

    const oceanSymbol = new L.Icon({
        iconUrl: OceanIcon,
        iconSize:[26,26]
    });

    const coastSymbol = new L.Icon({
        iconUrl: CoastIcon,
        iconSize:[26,26]
    });
    //NOTE ****
    //IF WE USE THE BUTTONS ON THE LEFT WE ALTER THE CSS OF THAT BUTTON WHEN CLICKED, IF WE JUST CLICK A MARKER ON THE MAP, NO BUTTON
    //ON THE LEFT WILL HAVE ITS STYLE CHANGED (DIDNT USE THAT BUTTON TO OPEN THE MARKER), WHEN A MARKER IS OPENED BY CLICKING THE MAP
    //ONLY THE ATLAS WILL HAVE A SPECIFIC TITLE CARD CHANGE COLORS TO INDICATE THE MARKER IS OPEN NO BUTTON ON THE LEFT WILL CHANGE
    //IF A BUTTON ON THE LEFT IS USED TO OPEN A POPUP THE ATLAS WILL ALSO INDICATE WHAT POPUP IS BEING SHOWN
    //triggered by left search buttons
    const clickHandler = (title,activation,ref) =>{
        setButtonRef(ref.current);
        const markerToOpen = markerRefs.current[title]; //the marker ref of specific value of button clicked
        
        if(ref.current.className === "glow-button"){
            markerClick(title);
            markerToOpen.openPopup();   //automatically calls popupclosehandler()
            ref.current.className = "glow-button-active";
        }
        else{
            markerToOpen.closePopup();    
            ref.current.className = "glow-button" 
        }
    }

    //called when popup is closed on map display(note: only 1 popup is open at a time)
    const popUpCloseHandler = () =>{
        if(btnRef){
        if(btnRef.className === "glow-button-active"){
            btnRef.className = "glow-button"
        }
        }
    }

    //const popUpOpenHandler = () =>{
     //   console.log("marker opened from line 127");
    //}

    //center map, function passed as prop to mapButtons
    const centerHandler = () => {
       mapRef.current.flyTo(center, 2, {duration:2}); 
    }
    //zoom to max zoom level
    const zoomInHandler = () =>{
        mapRef.current.setZoom(3);
    };
    //zoom out to lowest zoom level 
    const zoomOutHandler= () =>{
        mapRef.current.setZoom(2);
    }
    //called to open raster cirlce layer for areas of map 
    const testLayerFunction = (buttonTitle) =>{
        if(buttonTitle === "Great Shadeck Forest"){
            if(!showLayerGSF)
                showGSF(true);
            else
                showGSF(false);
        }
        if(buttonTitle === "LLucian Lake"){
            if(!showLayerLake)
                showLLk(true);
            else
                showLLk(false); 
        }
    }
    //returns the correct icon based on document area string to show different markers 
    //just check what the field is in the mongodb document
    const iconSelector = (area) =>{
        if(area === "woodlands"){
            return woodSymbol
        }
        if(area === "alpine"){
            return mntSymbol
        }
        if(area === "lake"){
            return lakeSymbol
        }
        if(area === "ice"){
            return iceSymbol
        }
        if(area === "ocean"){
            return oceanSymbol
        }
        if(area === "coast"){
            return coastSymbol
        }
        else
        return woodSymbol
    }
    return(
        
    <div className = "mainDiv" data-testid = "mapDisplay-1">
       
        <div className = "mapDisplaySearch">
            <LeftSearch locations = {Data} eventFunction = {clickHandler}></LeftSearch>
        </div>

        <section className="MapDisplayBody">
        <div className = "mapDisplay">    
        {/*responsible for creating map instance and providing to child components, props used as map options  */
        //NOTE - react leaflet is providing mapping to leaflet js with the use of components MUST LOOK AT BOTH DOCUMENTATIONS
        }
            <MapContainer
                className = "map-container"
                ref = {mapRef}
                center={[9,-22]} 
                zoom={13} 
                scrollWheelZoom={true} 
               >
                {showLayerGSF &&
                    <Circle center = {[-20,15]} pathOptions ={fillBlueOptions} radius = {4600000}>
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
                {showLayerLake &&
                    <Circle center = {[-40,43]} pathOptions ={fillBlueOptions} radius = {1600000}>
                    <Popup>
                    named for myself. Most of the world calls me Lee. My best friends call me Cabbage. But a few people 
                    call me Lucian and I think I’ve always identified with my middle name as much as my first.  
                    I look like a Lee- I feel like a Lucian.  My brother Dan was the first person to start 
                    calling me Lucian- which I appreciate.  Heidi and occasionally my kids will call me Lucian.  
                    I am pretty sure the voice i talk to myself in - is Lucian. It’s illerative and if you say it right 
                    it sounds like Alutian - which I think is funny.Lucian is my godfather and my dad just liked the name Lee.  
                    One time my dad said at a family dinner - ‘We were briefly thinking of naming you Lucian Lee- but that’s too Chinese”.  
                    That was 15+ years ago and it’s still mentioned a few times a year.  

                    </Popup>
                </Circle>
                }             
    
                <TileLayer minZoom={2} maxZoom = {3} noWrap = {true}
                    url={tileUrl}
                />

                {!isLoading && loadedMarks && 

                loadedMarks.map((location) => (
                <Marker
                    id = {location.title}
                    key = {location.title}
                    icon = {iconSelector(location.area)}
                    position={[location.yPoint,location.xPoint]} 
                    ref = {(ref)=>{
                        markerRefs.current[location.title] = ref;
                    }} 
                    eventHandlers={{
                        click: (e) => {
                        markerClick(location.title) //on click we get the rest of the markers data to display 
                    },
                    popupclose:()=>{
                       dispatch({type: 'markerClose'});      
                       popUpCloseHandler();
                    },
                    popupopen:()=>{     //called wether you click a button on the left or open a marker manually*
                       dispatch({type: 'markerOpen', name:location.title});
                       //popUpOpenHandler();
                    }
                    }}
                >
                <Popup maxWidth = {"auto"} maxHeight = {500} minWidth = {500}>
                    {clickedMarker && location.title === clickedMarker.title &&
                    
                    <div className ="content-div">
                    <div className = "displayImages">
                     {clickedMarker.img &&
                        clickedMarker.img.map((element)=>(
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
                            {clickedMarker.description}
                        </p>
                    </div>
                    {clickedMarker.link &&
                    <div className = "link-data">
                        {clickedMarker.link &&
                            clickedMarker.link.map((element)=>(
                                <div>
                                <a href = {element}>More Information About {location.title} </a>
                                <br></br>
                                </div>
                            ))
                        }
                    </div>
                    }
                    </div>                    
                    }
                </Popup>
                </Marker>   
                ))
                }  
           </MapContainer>
        </div>   
        </section>
      
        <section className="MapDisplayBody">
        <div>
            <div data-testid = "mapButtons-1">
                 <MapButtons activation = {centerHandler} activation2 = {zoomOutHandler} activation3 = {zoomInHandler}></MapButtons>
            </div>
            <div>
                 <Atlas layerController = {testLayerFunction} ></Atlas>
            </div>
        </div>   
        </section>
        </div>
     
    )
}

export default MapDisplay;
