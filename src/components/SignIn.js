import React from 'react'
import {useState} from 'react'
import LoginForm from './LoginForm'

export default function SignIn(){

    const adminUser = {
        username: "testing123",
        password: "Shadeck442"
    }

    //sets user data
    const [user,setUser] = useState({username:"", password:""});
    const [error,setError] = useState("");

    //login logic, called when we try to login
    //pass to form 
    const Login = (details) =>{
        console.log(details);
        //we are logged in 
        if(details.username == adminUser.username && details.password == adminUser.password){
            console.log("logged in");
            setUser({
                username:details.username,
                password: details.password
            });
        }
        else{
            console.log("details do not match");
            setError("credentials incorrect");
        }
    }

    const Logout = () =>{
        setUser({username:"", password:""});
    }
    return(
    <div className = "login">
        {(user.username !="") ?(
            <div className = "welcome">
                <h2>Welcome, <span>{user.username}</span></h2>
                <button onClick ={Logout}>Logout</button>
            </div>
        ):(
            <LoginForm login = {Login} error = {error} />
        )}
        
    </div>
    )
}