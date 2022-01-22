import {Fragment} from 'react';
import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import Header from '../header/header';
import Error from '../error/error';

const Form = styled.form`
    width: 400px;   
    position: absolute;
    top: 300px;
    left: 660px;
    transform: translate(-50%, -50%);
    font-size: .8rem;

    margin-top: 6rem;

    border: PowderBlue 1px solid;
    border-radius: 20px;
    padding: 1px 20px;

    box-shadow: 7px 7px 15px PowderBlue; 

    height: 34rem;

`;
const Button = styled.button`
    margin: 10%;
`;
const DivIniciarSesion = styled.div`
    font-size: 1rem;
    font-family:  sans-serif;
    text-align: center;
    margin:1rem;
`;

const NuevoUsuario = () => {
    const history = useNavigate();

    //crear state de citas
    const [registro, actualizarStateRegistro] = useState({
        correo:'',
        confirmacionCorreo:'',
        password:'',
        nombre:''
    });
    
    const[error, guardarError] = useState(false);
    const[mensaje, guardarMensaje] = useState('');    
    const[autenticado, guardarAutenticado] = useState(false);

    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarRegistro= e => {
        actualizarStateRegistro({
            ...registro,
            [e.target.name]: e.target.value
        })
    }
    const mandarMensaje = (mensaje) =>{
        
        guardarMensaje({
            ...mensaje,
            texto : mensaje
        })
    };
    //Extraer los valores
    const {correo,confirmacionCorreo,password,nombre} = registro;
    const {texto} = mensaje;

    //useEffect
    useEffect(() => {
        if(autenticado){
            history('/inventario');
        }

    },[autenticado]);
   
  const onSubmitForm = (e) => {
    e.preventDefault();

    if(correo.trim() ==='' || confirmacionCorreo.trim() ==='' || password.trim() ==='' || nombre.trim() ==='')
    {
        guardarError(true);
        mandarMensaje('Todos los campos son obligatorios.');
        return;
    }
    if(correo.trim() !== confirmacionCorreo.trim() ){
        guardarError(true);
        mandarMensaje('Los correos no coinciden, favor de verificar.');
        return;
    }
    guardarError(false);
    guardarAutenticado(true);
    guardarRegistro();
}

const guardarRegistro=  async () =>{
    try{

        let request;
        const url =  'http://localhost:3004/usuarios';

        request = await fetch(url,{
            method:'POST',
            body: JSON.stringify (registro),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resultado = await request.json();
        console.log(request);
        console.log(resultado);

    }catch(error){
        console.log(error);
    }
}

return ( <>
    <Header>
        </Header>
    <Form 
        onSubmit={onSubmitForm}
    > 
        <DivIniciarSesion>Registro</DivIniciarSesion>

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
            tipo='alert alert-danger'
            mensaje={texto}
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