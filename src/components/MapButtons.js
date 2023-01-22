import '../styles/mapButtons.css'

function MapButtons (props){

    const centerMap = () =>{
        props.activation();
    }

    const zoomOut = () =>{
        props.activation2();
    }

    const zoomIn = () =>{
        props.activation3();
    }

    return(
        <div className = "mapControl"> 
            <div className = "leftBtn">
                <button className ='controlBtn' onClick = {()=>{centerMap()}}>Center Map</button>
            </div>
            <div className = "leftBtn">
                <button className ='controlBtn' onClick = {()=>{zoomOut()}}>Zoom Out</button>
            </div>
            <div className = "leftBtn">
                <button className ='controlBtn' onClick = {()=>{zoomIn()}}>Zoom In</button>
            </div>
        </div>
    )


}

export default MapButtons;