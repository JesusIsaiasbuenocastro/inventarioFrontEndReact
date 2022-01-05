import {Outlet} from 'react-router-dom';
import CatalogoMarcas from "./catalogoMarcas";

const NavBar = () => {

    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Agencia de automoviles</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/Inventario">Inventario <span class="sr-only">(current)</span></a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                    Catalogo
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href='/CatalogoMarcas'>Marcas</a>
                        <a className="dropdown-item" href='/catalogoModelos'>Modelos</a>
                    </div>
                </li>
                </ul>
            </div>
        </nav>
         <Outlet/>
         </div>
    );
}

export default NavBar;

