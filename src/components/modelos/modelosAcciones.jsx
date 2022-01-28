import {Fragment,useEffect,useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft,faSave} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Spinner from '../spinner/spinner';
import Error from '../error/error';



const StyleForm = styled.form`
    
    font-size: .8rem;
    border-radius: 20px;
    width: 30rem;
    height: 20rem;
    box-shadow: 7px 7px 15px PowderBlue; 
    margin-top: 2rem;
    margin-bottom: 25px;
    text-align: center;

    padding: 5px;
`;

const StyleHeader = styled.label`
    
    font-size: 1.5rem;
    font-family: 'Oswald', sans-serif;
    text-align: center;
    font-weight: bold;
`;

const StyleDivEncabezado = styled.div`
    width: 30rem;
`;

const StyleDiv = styled.div`
    text-align: left;
    margin-top: 10px;

`;
const StyleDivButton = styled.div`
    text-align: right;
    margin-top: 10px;
`;

const ModeloAcciones = () => {
    const {idModelo} = useParams();
    const navigate = useNavigate();

    const [error , setError] = useState(false);
    const [esNuevo , guardarEsNuevo] = useState(false);
    const [modelo, guardarModelo] = useState({
        id: '',
        nombre: '',
        marca: '',
        tipo:''
    });
    const [cargando, setCargando] = useState(true);

    //validar si es un registro nuevo consultar el dato
    useEffect(() => {
        const obtenerDatosModelo = async () => {
            try {
                console.log('Entró a consultar');
                console.log(idModelo);
                const url =`http://localhost:4000/api/modelo/${idModelo}`;

                let request = await fetch(url);
                
               // const respuesta = await fetch(url);
                const resultado = await request.json();
               
                if(resultado.status !== 200){
                    console.log('Es nuevo');
                    guardarEsNuevo(true);
                }
                console.log(resultado);
                guardarModelo(resultado);
               
                
            } catch (error) {
                console.log(error);
            }

            setTimeout(() => {
                setCargando(!cargando);
            }, 300);
            
        }
        obtenerDatosModelo();
    },[]);

    //useState de para guardar la modelo
    const actualizarModelo = (e) => {
        e.preventDefault();
        console.log(modelo);
        guardarModelo({
            ...modelo,
            [e.target.name] : e.target.value
        })
    }


    //Guardar registro
    const guardarRegistro = async (e)  => {
        e.preventDefault();
        console.log(modelo.id );
        console.log(modelo.nombre );
        if( Object.keys(modelo).length ===0  ){
            //mandar mensaje de validación
            setError(true);
            return;
        }

        if(Object.keys(modelo.nombre.trim()).length ===0){
             //mandar mensaje de validación
             setError(true);
             return;
        }
        let url ;
        let metodo ;
        console.log(esNuevo);
        if(!esNuevo){
            url =  `http://localhost:4000/api/modelo/${modelo.id}`;
            metodo = 'PUT';
            console.log('Se actualizo');
        }else{
            url =  'http://localhost:4000/api/modelo';
            metodo ='POST';
            console.log('Se inserto');
        }

        try {
            let request;
    
            request = await fetch(url,{
                method: metodo,
                body: JSON.stringify (modelo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const resultado = await request.json();
           
            
        } catch (error) {
            console.log(error);
        }

        //mandar mensaje de exito    
        const MySwal = withReactContent(Swal)

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro guardado exitosamente',
            showConfirmButton: false,
            timer: 1500,
            
          
        }).then(() => {
           navigate('/catalogomodelos');
        })     
    }

    
    //Regresar al catálogo de marcas
    const regresarModelos = (e) => {
        e.preventDefault();
        navigate('/catalogomodelos');
    }
    return ( 
        <Fragment>
        { cargando ?
            <Spinner/>
        :
        <Fragment>
        <StyleDivEncabezado className='container'>
            <div className='row'>
                <div className='col-5'>    
                    <StyleHeader>Catálogo de modelos</StyleHeader>
                </div>
                <StyleDivButton className='col-7'>   
                    <button className='btn btn-secondary'
                        onClick={regresarModelos} > 
                        <FontAwesomeIcon icon={faArrowCircleLeft} className='mr-2' />
                        Regresar
                    </button>
                </StyleDivButton>
            </div>
        </StyleDivEncabezado>
        <StyleForm className='container'>
        
            {

                !esNuevo ? 
                        <div className="form-group">
                        <StyleDiv><label>Id modelo:</label></StyleDiv>
                            <input 
                                type="text" 
                                name="id"
                                disabled
                                className="form-control" 
                                id="id" 
                                onChange={actualizarModelo}
                                value={ modelo.id  ? modelo.id : ''   }
                                placeholder='Id de la modelo'
                            />
                        </div>
                    :null
                }
                <div className="form-group">
                    <StyleDiv ><label>Nombre:</label></StyleDiv>
                    <input type="text" 
                        name="nombre"
                        className="form-control" 
                        id="nombre"
                        placeholder='Ingresar nombre'
                        value={modelo.nombre}
                        onChange={actualizarModelo} />
                </div>
            
                <StyleDivButton className="form-group">

                    <button type="submit" 
                        name="btnGuardar"
                        id="btnGuardar"
                        className="btn btn-primary" 
                        onClick={guardarRegistro}>
                            <FontAwesomeIcon icon={faSave} className='mr-2' />
                            Guardar
                        </button> 
                </StyleDivButton>
                {
                    error ?  <Error 
                    tipo='alert alert-danger'
                    mensaje='El nombre del modelo es obligatorio'
                    ></Error>
                    :
                    null
                }
            </StyleForm>
            </Fragment>
        
        }
        </Fragment>
     );
}
 
export default ModeloAcciones;