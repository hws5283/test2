import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css'
import SideDrawer from './SideDrawer';
import Backdrop from '../../components/general/Backdrop'

const MainNavigation = props =>{

    //state of drawer, initially drawer is not open
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () =>{   //sets drawer state to true to open drawer
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () =>{
        setDrawerIsOpen(false);
    }
    return(
        <React.Fragment>
        {drawerIsOpen && <Backdrop onClick = {closeDrawerHandler}/>}
    
        <SideDrawer show = {drawerIsOpen} onClick = {closeDrawerHandler}>
            <nav className = "main-navigation__drawer-nav">
                <NavLinks></NavLinks>
            </nav>
        </SideDrawer>

        <MainHeader>
            <button className = "main-navigation__menu-btn" onClick = {openDrawerHandler}>
                <span/>
                <span/>
                <span/>    
            </button>
            <div className="headerTitle">
            <div className = "navImage">
                <img height = '50px' width = '50px' src = {require('../../navImages/testIcon.png')} alt = "testing">
                </img>
            </div>
            <h1 className = "main-navigation__title">
                <Link to = "/">Great Shadeck Expanse</Link>   
            </h1>
            </div>
            <nav className = "main-navigation__header-nav">
                <NavLinks></NavLinks>
            </nav>
        </MainHeader>
        </React.Fragment>
    )
};

export default MainNavigation;