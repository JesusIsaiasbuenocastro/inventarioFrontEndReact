import {Fragment, useEffect, useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { useNavigate  } from 'react-router-dom';
import MarcaTable from './marcaTable';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

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

const CatalogoMarcas = () =>{
   
    const [marcas,setMarcas] = useState([{}]);
    const [cargando, setCargando] = useState(true);
    const [error,setError] = useState(false);
    const navigate = useNavigate();

    const agregarModificarMarca = (e) => {
        e.preventDefault();
        navigate('/marcaacciones/-1');
    }
    
    useEffect(()=>{
        const consultarMarcas =  async () =>{
            try{
                let respuesta;
                const url =  'http://localhost:3004/marca';
        
                respuesta = await fetch(url);
                const response = await respuesta.json();
                setMarcas(response);
            }catch(error){
                console.log(error);
                console.log('Ocurrio un error');
                setError(true);
            }
        };
        consultarMarcas();
        setTimeout(() => {
            setCargando(!cargando);
        }, 200);
        
    },[]);

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
                    mensaje='Ocurrió un error al consultar las marcas'
                    />
                    : 
                        <Fragment>
                        <StyleDivEncabezado className='container'>
                            <div className='row'>
                                <div className='col-8'>    
                                    <StyleHeader>Catálogo de marcas</StyleHeader>
                                </div>
                                <div className='col-4'>   
                                    <StyleBtnAgregar className='btn btn-secondary'
                                        onClick={agregarModificarMarca} > 
                                        <FontAwesomeIcon icon={faPlusCircle} className='mr-2' />
                                        Agregar
                                    </StyleBtnAgregar>
                                </div>
                            </div>
                        </StyleDivEncabezado>
                        <StyleTable className="container table table-borderless table-hover ">
                        
                            <thead height="10" >
                                <tr>
                                    <th width="20" >ID</th>
                                    <th width="100" >Marca</th>
                                    <th width="20">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    marcas.map( marca => (
                                        <MarcaTable 
                                            key={marca.id}
                                            marca={marca}
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

export default CatalogoMarcas;