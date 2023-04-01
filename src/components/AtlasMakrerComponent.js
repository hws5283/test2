import React from 'react'
import '../styles/atlasMarkerComponent.css'
import {useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';

function AtlasMarkerComponent(props){

    //subscribe to redux store and get peice of state object -> changes in this state cause re renders...
    const name = useSelector(state => state.markerName);
    const banner = useRef();

    //triggered for all atlasMarker components on name change -> get from redux store...
    useEffect(()=>{
        if(name === props.title){
            banner.current.scrollIntoView({behavior:"smooth"});
        }
    },[name])

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