import {Fragment} from 'react';
import {
  Router,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/navbar';
import CatalogoMarcas from './components/catalogoMarcas';
import CatalogoModelos from './components/catalogoModelos';
import Inventario from './components/inventario';

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<NavBar />} >
            </Route>

            <Route path='/catalogoModelos' element={<NavBar/>}>
              <Route index element ={<CatalogoModelos/>} />
            </Route>

            <Route path='/catalogoMarcas' element={<NavBar/>}>
              <Route index element ={<CatalogoMarcas/>} />
            </Route>
            
            <Route path='/inventario' element={<NavBar/>}>
              <Route index element ={<Inventario/>} />
            </Route>
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
