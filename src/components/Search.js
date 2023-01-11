import '../styles/search.css'
import {useState} from 'react'

function Search(props){
    //search bar for user input, buttons generated depend on this components logic 

    const [searchText, setSearchText] = useState('');

    //called when input changes 
    const textChangeHandler = (event) =>{
        setSearchText(event.target.value);
        //use prop to send data back to parent (leftSearch)
        props.onInputChange(searchText);
    }

    return(
        <div className = "searchBar">
            <input 
                className = "search" 
                type = "search" 
                onChange = {textChangeHandler} 
                placeholder = "Try searching a location!" />
        </div> 
    )
}

export default Search;