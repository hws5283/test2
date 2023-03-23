import {createStore} from 'redux';

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