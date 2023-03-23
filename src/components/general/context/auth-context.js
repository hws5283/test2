import { createContext } from "react";

//here we create the context 
//only represents the kind of information that can be provided
//or read from components 
export const AuthContext = createContext({
    isLoggedIn: false, 
    userId: null,
    token:null,
    login:()=>{}, 
    logout: ()=>{}
});