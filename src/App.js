import React from 'react'
import 
{BrowserRouter as Router, 
  Route, 
  Routes} from 'react-router-dom';

//PAGE components for nav
import MapDisplay from './components/MapDisplay.js';
import SignIn from './components/SignIn.js';
import Update from './components/Update.js';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css'

import MainNavigation from './components/navigation/MainNavigation';
//Remember this is the first thing being rendered 

function App() {

  return(
    <Router>
      <MainNavigation/>
      <main>
      <Routes>
       <Route path = "/" exact = {true} element = 
          {<MapDisplay></MapDisplay>}>
        </Route>
        <Route path = "/login" exact = {true} element =
          {<SignIn></SignIn>}>
        </Route>
        <Route path = "/update" exact = {true} element = 
         {<Update></Update>}>
       </Route>
        <Route path = "/about" exact = {true} element = 
          {<About></About>}>
        </Route>
      </Routes>
      </main>
      <MainNavigation/>
    </Router>
  )

}

export default App;
