import React, {useState} from 'react';
import '../styles/login.css'


export default function LoginForm({login, error}) {
    const [details,setDetails] = useState({username:"",password:""});
    
    //form submission logic
    const submitHandler = e =>{
        e.preventDefault();
        login(details);  //passed as prop
    }
    
    
    return (
        <form onSubmit={submitHandler}>
            <div className = "form-inner">
                <h2>Login</h2>
                {(error !="") ? (<div className = "error">{error}</div>):""}
                <div className = "form-group">
                    <label htmlFor = "username">Username:</label>
                    <input type = "text" name = "username" id = "username" onChange ={e=>setDetails({...details, username: e.target.value})} value = {details.username}/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "password">Password:</label>
                    <input type = "password" password = "password" id = "password" onChange ={e=>setDetails({...details, password: e.target.value})} value = {details.password}></input>
                </div>
                <div>
                    <input type = "submit" value = "LOGIN"/>
                </div>
            </div>
        </form>
    )
}