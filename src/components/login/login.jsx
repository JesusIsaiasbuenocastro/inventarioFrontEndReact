import { useState } from 'react'; 


import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/header';
import Logo from '../../assets/car-g7966da1dc_640.png';
import Error from '../error/error';


const Form = styled.form`
    
    font-size: .8rem;
    animation-duration: .5s;
    animation-name: slidein;
    @keyframes slidein {
        from {
        margin-left: 100%;
        width: 300%
        }
  
    to {
      margin-left: 0%;
      width: 100%;
    }
`;
const Button = styled.button`
    margin: 10%;
`;
const DivLogin = styled.div`
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const HrLineaDivisora = styled.hr`
    height: 100%;
    width: 1px;
    border:0;
    background: linear-gradient(to bottom, blue,aqua , blue);

`;

const Login = () => {

    
    //crear state de citas
    const [login, actualizarStatelogin] = useState({
        correo:'',
        password:''
    });

    const[error, guardarError] = useState(false);


    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarLogin= e => {
        actualizarStatelogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    //Extraer los valores
    const {correo,password} = login;
    
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(correo.trim() ===''){
            guardarError(true);
            return;
        }
        if(password.trim() ===''){
            guardarError(true);
            return;
        }
        console.log('Se ejecutó la funcion');
    }
    return ( <>

        <Header>
        </Header>
        <DivLogin className='row'>
            <div className='col col-md-offset-4'>
                <img src={Logo} width="300" height="150"></img>
            </div>
            <div className='col col-md-offset-4'>
                <HrLineaDivisora />
            </div>
            <div className='col-4 col-md-offset-4'>
                <Form 
                    onSubmit={onSubmitForm}
                > 
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="correo"
                            className="form-control" 
                            id="txtCorreoElectronico" 
                            aria-describedby="emailHelp"
                            onChange={actualizarLogin}
                            />
                        
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                            name="password"
                            className="form-control" id="txtPassword"
                        onChange={actualizarLogin} />
                    </div>
                    {
                        error ?  <Error 
                        tipo='alert alert-primary'
                        mensaje='El usuario y password son obligatorios'
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