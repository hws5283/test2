import {createStore} from 'redux';

//reducer job - spit out new state snapshot (state object) when action reaches it
const counterReducer = (state = {markerName: ""},action) =>{
    if(action.type === 'markerOpen'){
        return{
            markerName: state.markerName +action.name,
        };
    }
    if(action.type === 'markerClose'){
        return{
            markerName: "",
        };
    }
    return state;
}
const store = createStore(counterReducer);
export default store;