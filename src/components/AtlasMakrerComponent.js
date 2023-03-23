import React from 'react'
import '../styles/atlasMarkerComponent.css'
import {useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';

function AtlasMarkerComponent(props){

    const name = useSelector(state => state.markerName);
    const banner = useRef();

    return(
        <div className = "atlasEntryContainer">
        <div className = {(name === props.title) ? "active"+ props.styleInfo: props.styleInfo} ref = {banner}>
            <div className = "atlasVisual">
            <img className = "atlasIcon" src = {props.img} height = "26px" width = "26px" alt = "marker icon"></img>
            {props.title}
            </div>
        </div>
        </div>  
    )
}

export default AtlasMarkerComponent;