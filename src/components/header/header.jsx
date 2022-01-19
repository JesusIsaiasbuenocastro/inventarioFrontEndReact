import styled from 'styled-components';

const StyleDivEncabezado = styled.div`
    background-color: #33B3FF;
    padding: 2rem 0;
    text-align: center;
    width: 80rem;
    box-shadow: 10px 10px 15px PowderBlue; 
`;
const StyleH3 = styled.h3`
    color: white;
    font-size: 1.5rem;
    font-family: 'Oswald', sans-serif;
    
`;


const Header = () => {
    return ( 
        <StyleDivEncabezado>
            <StyleH3>Sistema de control de inventario</StyleH3>    
        </StyleDivEncabezado> 
     );
}
 
export default Header;