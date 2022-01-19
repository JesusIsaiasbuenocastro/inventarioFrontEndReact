import React,{ useState,useEffect } from 'react'; 

import  {useNavigate   } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/header';
import Logo from '../../assets/Inventario.png';
import Error from '../error/error';


const Form = styled.form`
    
    font-size: .8rem;
    animation-duration: .5s;
    border: PowderBlue 1px solid;
    border-radius: 20px;
    padding: .5rem 2rem;
    width: 400px;
    height: 380px;
    box-shadow: 7px 7px 15px PowderBlue; 
    margin-top: 2rem;
        
`;
const Button = styled.button`
    margin: 10%;
`;
const DivLogin = styled.div`
    width: 60rem;
    position: absolute;
    top: 300px;
    left: 600px;
    transform: translate(-50%, -50%);
    
`;
const HrLineaDivisora = styled.hr`
    height: 100%;
    width: 1px;
    border:0;
    background: linear-gradient(to bottom, blue,aqua , blue);

`;

const DivIniciarSesion = styled.div`
    font-size: 1rem;
    font-family:  sans-serif;
    text-align: center;
    margin:1rem;
`;

const Login = (props) => {
    const history = useNavigate();
    
    //crear state de citas
    const [login, actualizarStatelogin] = useState({
        correo:'',
        password:''
    });
    const[mensaje, guardarMensaje] = useState('');

    const[error, guardarError] = useState(false);

    const[autenticado, guardarAutenticado] = useState(false);

    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarLogin= e => {
        actualizarStatelogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    //Extraer los valores
    const {correo,password} = login;
    const {texto} = mensaje;

    //useEffect cuando cambia el error
    useEffect(() => {
        if(autenticado){
            history('/inventario');
        }

    },[autenticado]);
    
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(correo.trim() ===''){
            guardarError(true);
            mandarMensaje('El correo es un dato obligatorio');    
            return;
        }
        if(password.trim() ===''){
            guardarError(true);
            mandarMensaje('El password es un dato obligatorio');    
            return;
        }
        
        //validar que el correo y el password sean correctos        
        if(correo !== 'correo@correo.com'){
            guardarError(true);
            mandarMensaje('El usuario o password es incorrecto');            
            return;
        }
        guardarError(false);

        guardarAutenticado(true);
        

    }
    const mandarMensaje = (mensaje) =>{
        
        guardarMensaje({
            ...mensaje,
            texto : mensaje
        })
    };

    return ( <>

        <Header>
        </Header>
        <DivLogin className='row'>
            <div className='col col-md-offset-4'>
                <img src={Logo} width="400" height="300"></img>
            </div>
            <div className='col col-md-offset-4'>
                <HrLineaDivisora />
            </div>
            <div className='col-5 col-md-offset-4'>
                
                <Form 
                    onSubmit={onSubmitForm}
                > 
                    <DivIniciarSesion>Iniciar Sesión</DivIniciarSesion>
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="correo"
                            className="form-control" 
                            id="txtCorreoElectronico" 
                            aria-describedby="emailHelp"
                            onChange={actualizarLogin}
                            placeholder='correo@correo.com'
                            />
                        
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                            name="password"
                            className="form-control" id="txtPassword"
                            placeholder='Ingresar Contraseña'
                            onChange={actualizarLogin} />
                    </div>
                    {
                        error ?  <Error 
                        tipo='alert alert-danger'
                        mensaje={texto}
                    ></Error>
                    :null
                    }
                   
                    <Button className='btn btn-primary' type="submit" >
                        <FontAwesomeIcon icon={faUser} className='mr-2' />
                        Iniciar Sesión
                    </Button>
                    
                    <a href='/nuevousuario'>Registrate</a>
                   
                </Form>
            </div>
            
        </DivLogin>
        
        </>
    );
}
 
export default Login;