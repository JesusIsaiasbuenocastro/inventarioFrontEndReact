import styled from 'styled-components';
import CatalogoMarcas from "../marcas/catalogoMarcas";

const StyleDivEncabezado = styled.div`
    padding: 2rem 0;
    text-align: center;
`;

const NavBar = () => {

    return(
        <StyleDivEncabezado>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">Agencia de automóviles</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/inventario">Inventario <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                        Catálogo
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href='/catalogomarcas'>Marcas</a>
                            <a className="dropdown-item" href='/catalogomodelos'>Modelos</a>
                        </div>
                    </li>
                    </ul>
                </div>
            </nav>
        </StyleDivEncabezado>
    );
}

export default NavBar;

