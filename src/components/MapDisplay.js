import {MapContainer,TileLayer, Marker, Popup, Polyline,  Rectangle} from 'react-leaflet'
import L from 'leaflet'
import {useRef} from 'react'
import MapRef from './MapRef'
import cavernMarker from '../navImages/cavern.webp'
import lakeMarker from '../navImages/lakeIcon.webp'
import forestMarker from '../navImages/forestIcon.webp'
import mountainMarker from '../navImages/mountainIcon.png'

//This component displays the react leaflet map 

function MapDisplay(props){

    const mapPass = (theMap) =>{
        const test = theMap;
    };

    //map reference - leaflet map instance created by MapContainer component 
    const mapRef = useRef(null);

    //lat and longitude, latitude longitude 
    // [0,0] dead center of map 
    const rectangle = [
        [-50, 60],
        [0, -30],
      ]

    const rectangle2 = [
        [20, -80],
        [-40, -40]
    ]

    var latlngs = [
        [-50,10],
        [-50, -35],
        [-30, -40],
        [0, -40],
        [8, -30],
        [0,0],
        [0,60],
        [-25,60],
        [-30,50],
        [-20,40],
        [-25,30],
        [-50,10]
    
    ];

    const tileUrl = '../cuts/{z}/{x}/{y}.png';

    const lakeIcon = new L.Icon({
        iconUrl:lakeMarker,
        iconSize:[26,26]
    });

    return(
        <div className = "mapDisplay">    
        {/*responsible for creating map instance and providing to child components, props used as map options  */
        //NOTE - react leaflet is providing mapping to leaflet js with the use of components MUST LOOK AT BOTH DOCUMENTATIONS
        }
            <MapContainer 
                whenCreated={(map) => {
                  mapRef.current = map;
                }} 
                center={[9,-22]} 
                zoom={13} 
                scrollWheelZoom={true} 
                style = {{height: "800px", width: "800px"}}
               >
                <MapRef function = {mapPass}></MapRef>
            
                <TileLayer minZoom={2} maxZoom = {4} noWrap = {true}
                    url={tileUrl}
                />
            
                <Marker
                        id = "Lake Leonard"
                        icon = {lakeIcon} 
                        position={[-30, 80]} 
                        //ref = {(ref)=>{
                         //   markerRefs.current["Lake Leonard"] = ref;
                        //}} 
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
                
                <Polyline positions = {latlngs}></Polyline>
            
           </MapContainer>
        </div>     
    )
}

export default MapDisplay;