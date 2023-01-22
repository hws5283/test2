import React from 'react'
export default function Update(){

    return(
        <form action = "">
            <div>
                <label for ="name">Point Description:</label>
                <input type = "text" name = "name" id = "name"></input>
            </div>
            <div>
                <input type = "submit" value = "Update Point"></input>
            </div>
        </form>
    )
}