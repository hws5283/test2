import React from 'react';
import {useMap} from 'react-leaflet'

function MapRef(props){
    const map = useMap();
    props.function(map);
    return null;
}

export default MapRef;