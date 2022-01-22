import React from 'react';
import {Outlet} from 'react-router-dom';
import styled from 'styled-components';
import Header from '../header/header';

import NavBar from '../navbar/navbar';

const StyleDiv = styled.div`
    width: 80rem;
	max-width: 1200rem;
`;

const Layout = () => {

    const sesion = true;

    return ( 
        <StyleDiv>
            <Header></Header>
            { sesion ? <NavBar></NavBar> : null }
            <Outlet/>
        </StyleDiv>
     );
}
 
export default Layout;