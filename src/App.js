import React,{useState,useCallback} from 'react'
import 
{BrowserRouter as Router, 
  Route, 
  Navigate,
  Routes} 
  
from 'react-router-dom';

//PAGE components for nav
import MapDisplay from './components/MapDisplay.js';
import Update from './components/Update.js';
import About from './components/AboutComp1';
import Auth from './components/login/Auth'
import 'bootstrap/dist/css/bootstrap.min.css'

import MainNavigation from './components/navigation/MainNavigation';
import {AuthContext} from './components/general/context/auth-context'
import { Nav } from 'react-bootstrap';
//Remember this is the first thing being rendered 
//wrapping ENTIRE router with authContext !!!!
//basically whole application has access to auth-context
function App() {

  const[isLoggedIn,setIsLoggedIn] = useState(false);   //controls logged in state, passed to context

  //wrap with usecallback so it is not recreated 
  const login = useCallback(()=>{    //passed to context
    setIsLoggedIn(true);
  },[]);
  
  const logout = useCallback(()=>{    
    setIsLoggedIn(false);
  },[]);

  let routes;

  if(isLoggedIn){
    routes = 
    (
      <Routes>
      <Route path = "/" exact = {true} element = 
          {<MapDisplay></MapDisplay>}>
        </Route>
        <Route path = "/update" exact = {true} element =       //ONLY RENDERED ONSUCCESSFUL LOGIN!!!!
         {<Update></Update>}>
       </Route>
        <Route path = "/about" exact = {true} element = 
          {<About></About>}>
        </Route>  
        <Route path = "*" element = {<Navigate to = "/"/>}/>  
        </Routes>
    );
  }else{
    routes = (                                            //WE DONT RENDER THE UPDATE TAB IN THIS SITUATION
      <Routes>
      <Route path = "/" exact = {true} element = 
      {<MapDisplay></MapDisplay>}>
      </Route>

      <Route path = "/login" exact = {true} element =
          {<Auth></Auth>}>
        </Route>

      <Route path = "/about" exact = {true} element = 
      {<About></About>}>
      </Route>
      <Route path = "*" element = {<Navigate to = "/Login"/>}/>
      </Routes>
    );
  }

  //value paramater - values 
  return(
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout}}>  
    <Router>
      <MainNavigation/>
      <main>
        {routes}
      </main>
      <MainNavigation/>
    </Router>
    </AuthContext.Provider>
  )

}

export default App;
