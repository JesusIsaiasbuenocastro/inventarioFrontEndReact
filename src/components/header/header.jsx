import styled from 'styled-components';

const StyleDivEncabezado = styled.div`
    background-color: blue;
    padding: 2rem 0;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 60px;
`;
const StyleH3 = styled.h3`
    color: white;
    font-size: 1.5rem;
    font-family: 'Oswald', sans-serif;
`;


const Header = () => {
    return ( 
        <StyleDivEncabezado>
            <StyleH3>Sistema de inventario</StyleH3>    
        </StyleDivEncabezado> 
     );
}
 
export default Header;