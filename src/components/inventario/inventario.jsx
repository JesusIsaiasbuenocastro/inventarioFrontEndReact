
import { useEffect,useState,Fragment } from "react";
import Spinner from '../spinner/spinner';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { useNavigate  } from 'react-router-dom';
import Error from '../error/error';
import InventarioTable from "./inventarioTable";

const StyleHeader = styled.label`
    
    font-size: 1.5rem;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    text-align: center;
`;

const StyleTable = styled.table`
    
    font-size: .8rem;
    border-radius: 20px;
    width: 90rem;
    box-shadow: 7px 7px 15px PowderBlue; 
    margin-top: 1rem;
    text-align: center;


`;

const StyleDivEncabezado = styled.div`
    width: 90rem;
`;

const StyleBtnAgregar = styled.button`
    margin-left: 7rem
`;


const Inventario = () => {
    const[error,setError] = useState(false);
    const[cargando, setCargando] = useState(true);
    const [inventario, setInventario] = useState({
        id: '',
        marca: '-1',
        modelo: '-1',
        year: '',
        tipo:'-1',
        color:'',
        cantidad:0 ,
        kilometraje: 0
    });
    const navigate = useNavigate();
    

    useEffect(()=>{
        const consultarInventario =  async () =>{
            try{
                let respuesta;
                let url =  'http://localhost:4000/api/inventario';
        
                respuesta = await fetch(url);
                let responseInventario = await respuesta.json();
                setInventario(responseInventario);

            }catch(error){
                setError(true);
            }
        };
        consultarInventario();

        setTimeout(() => {
            setCargando(!cargando);
        }, 1000);
        
    },[]);


    const agregarModificarInventario = (e) => {
        e.preventDefault();
        navigate('/inventarioacciones/-1');
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
                mensaje='Ocurrió un error al consultar el inventario'
                />
                : 
                    <Fragment>
                    <StyleDivEncabezado className='container'>
                        <div className='row'>
                            <div className='col-8'>    
                                <StyleHeader>Inventario</StyleHeader>
                            </div>
                            <div className='col-4'>   
                                <StyleBtnAgregar className='btn btn-secondary'
                                    onClick={agregarModificarInventario} > 
                                    <FontAwesomeIcon icon={faPlusCircle} className='mr-2' />
                                    Agregar
                                </StyleBtnAgregar>
                            </div>
                        </div>
                    </StyleDivEncabezado>
                    <StyleTable className="container table table-borderless table-hover ">
       
                        <thead height="10" >
                            <tr>
                                <th>ID</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Tipo</th>
                                <th>Color</th>
                                <th>Cantidad</th>
                                <th>Kilometraje</th>
                                <th >Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                inventario.map( inventario => (
                                    
                                    <InventarioTable 
                                        key={inventario.id}
                                        inventario={inventario}
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
}
 
export default Inventario;