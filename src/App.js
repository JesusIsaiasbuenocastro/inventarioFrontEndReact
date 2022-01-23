import React,{Fragment} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Switch
} from "react-router-dom";
import Layout from './components/layout/layout';
import CatalogoMarcas from './components/marcas/catalogoMarcas';
import MarcaAcciones from './components/marcas/marcaAcciones';
import CatalogoModelos from './components/modelos/catalogoModelos';
import Inventario from './components/inventario/inventario';
import Login from './components/login/login';
import NuevoUsuario from './components/login/NuevoUsuario';
import ModeloAcciones from './components/modelos/modelosAcciones';


function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} >
            </Route>

            <Route path='/catalogomodelos' element={<Layout/>}>
              <Route index element ={<CatalogoModelos/>} />
            </Route>
            <Route path='/modeloacciones/:idModelo' element={<Layout/>}>
              <Route index element ={<ModeloAcciones/>} />
              <Route path =":idModelo" element ={<ModeloAcciones/>}/>
            </Route>
            <Route path='/catalogomarcas' element={<Layout/>}>
              <Route index element ={<CatalogoMarcas/>} />
            </Route>
            <Route path='/marcaacciones/:idMarca' element={<Layout/>}>
              <Route index element ={<MarcaAcciones/>} />
              <Route path =":idMarca" element ={<MarcaAcciones/>}/>
            </Route>
            
            <Route path='/inventario' element={<Layout/>}>
              <Route index element ={<Inventario/>} />
            </Route>
            <Route path='/nuevousuario' element={<NuevoUsuario/>}>
              <Route index element ={<NuevoUsuario/>} />
            </Route>
        </Routes>
      
      </BrowserRouter>
  );
}

export default App;
