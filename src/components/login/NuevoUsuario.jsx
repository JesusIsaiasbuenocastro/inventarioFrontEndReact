import {Fragment} from 'react';
import React,{ useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import Header from '../header/header';
import Error from '../error/error';

const Form = styled.form`
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: .8rem;
    height: 20rem;
`;
const Button = styled.button`
    margin: 10%;
`;

const NuevoUsuario = () => {
    
    //crear state de citas
    const [registro, actualizarStateRegistro] = useState({
        correo:'',
        confirmacionCorreo:'',
        password:'',
        nombre:''
    });

    const[error, guardarError] = useState(false);


    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarRegistro= e => {
        actualizarStateRegistro({
            ...registro,
            [e.target.name]: e.target.value
        })
    }
    //Extraer los valores
    const {correo,confirmacionCorreo,password,nombre} = registro;
    
   
  const onSubmitForm = (e) => {
    e.preventDefault();

    if(correo.trim() ==='' || confirmacionCorreo.trim() ==='' || password.trim() ==='' || nombre.trim() ==='')
    {
        guardarError(true);
        return;
    }
    guardarError(false);
}
return ( <>
    <Header>
        </Header>
        
    <Form 
        onSubmit={onSubmitForm}
    > 
        <div className="form-group">
            <label htmlFor ="correo">Correo Electrónico</label>
            <input name='correo'  type="email" className="form-control" id="correo" name='correo' 
                onChange={actualizarRegistro}/>
            
        </div>
        <div className="form-group">
            <label htmlFor ="confirmacionCorreo">Confirmar Correo Electrónico</label>
            <input type="email" className="form-control" id="confirmacionCorreo" name='confirmacionCorreo' 
            onChange={actualizarRegistro}/>
            
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={actualizarRegistro} />
        </div>
        <div className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" id="nombre" name='nombre' onChange={actualizarRegistro}/>
        </div>
        {
            error ?  <Error 
            tipo='alert alert-primary'
            mensaje='Todos los campos son obligatorios'
            ></Error>
            :
            null
        }

        <Button className='btn btn-primary' type="submit" > 
            <FontAwesomeIcon icon={faIdCard} className='mr-2' />
         Registrarse</Button>
        
        <a href='/'>Login</a>
        </Form>
        </>
    );
}
 
export default NuevoUsuario;