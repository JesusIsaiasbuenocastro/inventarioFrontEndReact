import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../header/header';

import NavBar from '../navbar/navbar';
const Layout = () => {

    const sesion = true;

    return ( 
        <div>
            <Header></Header>
            { sesion ? <NavBar></NavBar> : null }
            <Outlet/>
        </div>
     );
}
 
export default Layout;