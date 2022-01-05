import {Fragment} from 'react';
import {
  Router,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Layout from './components/layout/layout';
import CatalogoMarcas from './components/catalogoMarcas';
import CatalogoModelos from './components/catalogoModelos';
import Inventario from './components/inventario';
import Login from './components/login';

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} >
            </Route>

            <Route path='/catalogoModelos' element={<Layout/>}>
              <Route index element ={<CatalogoModelos/>} />
            </Route>

            <Route path='/catalogoMarcas' element={<Layout/>}>
              <Route index element ={<CatalogoMarcas/>} />
            </Route>
            
            <Route path='/inventario' element={<Layout/>}>
              <Route index element ={<Inventario/>} />
            </Route>
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
