import React, {useState, useContext }from 'react';
import AuthField from './AuthField';
import {VALIDATOR_REQUIRE} from '../../utils/validators'
import FormButton from '../formComponents/FormButton'
import {useLogin} from './loginForm-hook'
import Card from '../general/Card'
import './Auth.css'
import { AuthContext } from '../general/context/auth-context';

//end goal, want the form to have its own validation, sum up all validation
//of form inputs and decide of a valid form or not 
//DEFAULT TESTING INFO, will change before deployment
//---------------------
//username: Lee442
//password: Alter908?
//----------------------
//reducer logic ensures form validity and value is updated

//component updates with hook updates
const Auth = ()=>{

    //returns context value for calling component 
    const auth = useContext(AuthContext);

    //initialize usereducer in hook, using custom hook here
    //this is the only place weve used this custom hook ****
    const [formState,inputHandler] = useLogin(
        {
        username: {                 //initial inputs 
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
        },
        false  //initial form validity
    );

    const authSubmitHandler = event =>{
        event.preventDefault();  //prevent browser reload/refresh
        console.log('testing');
        console.log(formState.inputs);
        auth.login();  //update context and data managed by context object 
    }

    return(

        <section className = "loginSection">
        <div>
        <Card className = "authentication">
        <form className="place-form" onSubmit={authSubmitHandler}>
        <h2>Login Form</h2>
        <hr></hr>
        <AuthField 
            element = "input"
            type = "text"
            id = "username"
            label = "Username:" 
            validators = {[VALIDATOR_REQUIRE()]} 
            errorText = "Enter a valid username."
            onInput = {inputHandler}
            >
        </AuthField>
        <AuthField 
            element = "input"
            id = "password"
            type = "password"
            label = "Password:" 
            validators = {[VALIDATOR_REQUIRE()]} 
            errorText = "Enter a valid password."
            onInput = {inputHandler}
            >
            </AuthField>
            <button className = "loginSubmit" type = "submit" disabled = {!formState.isValid}>Login</button>
        </form>
        </Card>
        </div>
        </section>

    )

}
export default Auth;