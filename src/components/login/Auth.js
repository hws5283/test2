import React, {useState, useContext }from 'react';
import AuthField from './AuthField';
import {VALIDATOR_REQUIRE} from '../../utils/validators'
import {useLogin} from './loginForm-hook'
import Card from '../general/Card'
import './Auth.css'
import { AuthContext } from '../general/context/auth-context';
import LoadingSpinner from '../general/LoadingSpinner'
import Button from '../formComponents/FormButton'
import Modal from '../general/Modal';
import FormButton from '../formComponents/FormButton'

//end goal, want the form to have its own validation, sum up all validation
//of form inputs and decide of a valid form or not 
//reducer logic ensures form validity and value is updated
//component updates with hook updates
const Auth = ()=>{
    //returns context value for calling component 
    const auth = useContext(AuthContext);
    const[isLoading,setIsLoading] = useState(false);
    const[showOverlay, setShowOverLay] = useState(false);
    //initialize usereducer in hook, using custom hook here
    //this is the only place weve used this custom hook ****
    const [formState,inputHandler] = useLogin(
        {
        username: {              
            value: '',              //given to login route
            isValid: false
        },
        password: {
            value: '',              //given to login routed
            isValid: false
        }
        },
        false  //initial form validity
    );

    const closeModalHandler = () => setShowOverLay(false);
    const openModalHandler = () => setShowOverLay(true)


    //logic after form submition
    const authSubmitHandler = async (event) =>{
        event.preventDefault();  //prevent browser reload/refresh
        setIsLoading(true); //controls loading spinner overlay
        try{
            const response = await fetch('http://localhost:5000/api/users/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formState.inputs.username.value,
                    password: formState.inputs.password.value
                })
            });
            const responseData = await response.json();  //response includes our token
            if(!response.ok){     
                setShowOverLay(true);                      
                throw new Error(responseData.message);
            }
            else{
               
            }
            auth.login(responseData.userId, responseData.token);  //send userId and token to context 
        }catch(err){
            console.log('Something went wrong, please try again');
        }
        setIsLoading(false);//we are done logging in
    }

    return(

        <React.Fragment>
            <Modal 
                show = {showOverlay} 
                onCancel = {closeModalHandler} 
                header = {"Login Failed!"}
                headerClass="_fail"
                contentClass = "place-item__modal-content"
                footerClass = "place-item__modal-actions"
                footer = {<FormButton onClick = {closeModalHandler} text = {"OK"}></FormButton>}
                >
                <div className = "map-container">
                    <h2>Incorrect username or password</h2>
                </div>
            </Modal>

        <section className = "loginSection">
        <div className = "loginDiv">
        <Card className = "authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
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
            <Button type = "submit" disabled = {!formState.isValid} text = "Login"/>
        </form>
        </Card>
        </div>
        </section>
        </React.Fragment>

    )

}
export default Auth;