
import { useEffect,useState,Fragment } from "react";
import Spinner from '../spinner/spinner';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { useNavigate  } from 'react-router-dom';
import Error from '../error/error';
import ModeloTable from "./modeloTable";

const StyleHeader = styled.label`
    
    font-size: 1.5rem;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    text-align: center;
`;

const StyleTable = styled.table`
    
    font-size: .8rem;
    border-radius: 20px;
    width: 50rem;
    box-shadow: 7px 7px 15px PowderBlue; 
    margin-top: 1rem;
    text-align: center;


`;

const StyleDivEncabezado = styled.div`
    width: 50rem;
`;

const StyleBtnAgregar = styled.button`
    margin-left: 7rem
`;


const CatalogoModelos = () => {

    const[error,setError] = useState(false);
    const[cargando, setCargando] = useState(true);
    const[modelos,setModelo] = useState([{
        tipo: '',
      nombre: '',
      marca: '',
      id: ''
    }]);
    const[tipos,setTipo] = useState([{}]);
    const[marcas,setMarca] = useState({});

    const navigate = useNavigate();
    

    useEffect(()=>{
        const consultarModelo =  async () =>{
            try{
                let respuesta;
                let url =  'http://localhost:4000/api/modelo';
        
                respuesta = await fetch(url);
                let responseModelo = await respuesta.json();
                //console.log(responseModelo);
                setModelo(responseModelo);

            }catch(error){
                console.log(error);
                console.log('Ocurrio un error');
                setError(true);
            }
        };
        consultarModelo();

        setTimeout(() => {
            setCargando(!cargando);
        }, 1000);
        
    },[]);


    const agregarModificarModelo = (e) => {
        e.preventDefault();
        navigate('/modeloacciones/-1');
    }

    return(
        <>
        {cargando 
            ? 
            <Spinner />
        
        :
        <>
            {error ? 
                <Error 
                tipo='alert alert-danger'
                mensaje='Ocurrió un error al consultar los modelos'
                />
                : 
                    <Fragment>
                    <StyleDivEncabezado className='container'>
                        <div className='row'>
                            <div className='col-8'>    
                                <StyleHeader>Catálogo de modelos</StyleHeader>
                            </div>
                            <div className='col-4'>   
                                <StyleBtnAgregar className='btn btn-secondary'
                                    onClick={agregarModificarModelo} > 
                                    <FontAwesomeIcon icon={faPlusCircle} className='mr-2' />
                                    Agregar
                                </StyleBtnAgregar>
                            </div>
                        </div>
                    </StyleDivEncabezado>
                    <StyleTable className="container table table-borderless table-hover ">
                    
                        <thead height="10" >
                            <tr>
                                <th width="10" >ID</th>
                                <th width="20">Marca</th>
                                <th width="40">Modelo</th>
                                <th width="20">Tipo</th>
                                <th width="20">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                modelos.map( modelo => (
                                    
                                    <ModeloTable 
                                        key={modelo.id}
                                        modelo={modelo}
                                    />
                                ))
                            }
                        </tbody>
                    </StyleTable>
                </Fragment>
            }
            </>
            
        }
        
    </>
        
    );
};

export default CatalogoModelos;
