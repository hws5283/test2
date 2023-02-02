import {useState, useCallback, useRef, useEffect} from 'react'

//handles state management, database parsing, and status code checking
//want to just have a function to get data into the pages by sending request 
//NOTE: useEffect can be used when a component unmounts

export const useHttpClient = () =>{
    const[isLoading, setIsLoading] = useState(false);   //loading state
    const[error,setError] = useState();                 //error state

    const activeHttpRequests = useRef([]);   //array under useref, stores data accross rerenders

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) =>{
        //forward parameters to fetch
        setIsLoading(true); //starting to get data
        const httpAbortCtrll = new AbortController();  //available in modern browsers
        activeHttpRequests.current.push(httpAbortCtrll);  //add to array
        try{
            const response = await fetch(url,{
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal   //like abort ctrll to request
            });

             const responseData = await response.json();

            //was our response ok??
            if(!response.ok){
                console.log("error"); //throw error here
            }
            //response was ok
            return responseData; //return data to component
        }catch(err){
            setError(err.message);
        }
        setIsLoading(false);  //done getting data
    },[]); //no specific dependencies
    
    const clearError = () =>{
        setError(null);
    }

    //only runs when component mounts but returniing function here is treaded as a "cleanup" function
    //cleanup functions run 1. before next useEffect runs again or when component dismounts using useEffect(component using this hook)
    //switch away from component triggering request -> want to cancel this request 
    useEffect(()=>{
        return ()=>{
            //go thru all abortCtrl we call abort, request for which the controller is linked will be aborted 
            activeHttpRequests.current.forEach(abortCtrl=>abortCtrl.abort())
        }
    },[]);

    return {isLoading, error, sendRequest, clearError};   //return information back to component
};