import {Fragment,useEffect,useLayoutEffect,useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft,faSave} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
import OpcionesSelect from '../genericos/opcionesSelect';



const StyleForm = styled.form`
    
    font-size: .8rem;
    border-radius: 20px;
    width: 40rem;
    height: 35rem;
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
    width: 40rem;
`;

const StyleDiv = styled.div`
    text-align: left;
    margin-top: 10px;

`;
const StyleDivButton = styled.div`
    text-align: right;
    margin-top: 10px;
`;

const InventarioAcciones = () => {
    const {idInventario} = useParams();
    const navigate = useNavigate();

    const [error , setError] = useState(false);
    const [esNuevo , setEsNuevo] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState({});
    const [modeloSeleccionado, setModeloSeleccionado] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState([]);
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
    const [modelos , setModelos] = useState([{}]);
    const [marcas , setMarcas] = useState([{}]);
    const [tipos , setTipos] = useState([{}]);
    
    //validar si es un registro nuevo consultar el dato
    useLayoutEffect(() => {
        console.log('entro al usefect 1')
        const obtenerDatosInventario= async () => {
            try {
               
               //Consultar el modelo a mostrar
                let url =`http://localhost:4000/api/inventario/${idInventario}`;

                let response = await fetch(url);
                
                let resultado = await response.json();

                if(response.status !== 200){
                    setEsNuevo(true);

                } else{
                    console.log('Entro a consultar el modelo')
                    console.log(marcaSeleccionada);
                    console.log(resultado.DataMarca[0].id);

                    setMarcaSeleccionada({
                        ...marcaSeleccionada,
                        marca: resultado.DataMarca[0].id
                    });


                    console.log('Entro a consultar el modelo')
                    console.log(modeloSeleccionado);
                    console.log(resultado.DataModelo[0].id);

                    setModeloSeleccionado({
                        ...modeloSeleccionado,
                        modelo: resultado.DataModelo[0].id
                    });

                    setTipoSeleccionado({
                        ...tipoSeleccionado,
                        tipo: resultado.DataTipo[0].id
                    })
                }
                
                setInventario(resultado);
               
                url =`http://localhost:4000/api/modelo`;
                response = await fetch(url);
                    
                resultado = await response.json();

                if(response.status === 200){
                    setModelos(resultado);
                }
                

                //Consultar modelos de autos
                url =`http://localhost:4000/api/marca`;

                response = await fetch(url);
                
                // const respuesta = await fetch(url);
                resultado = await response.json();
                //console.log(resultado.status);

                if(response.status === 200){
                    setMarcas(resultado);
                } 

                //Consultar tipos de autos
                //Consultar el modelo a mostrar
                url =`http://localhost:4000/api/tipo`;

                response = await fetch(url);
                 
                // const respuesta = await fetch(url);
                resultado = await response.json();
                //console.log(resultado.status);

                if(response.status === 200){
                    setTipos(resultado);

                    setTipoSeleccionado({
                        ...tipoSeleccionado,
                        tipo: resultado.DataTipo[0].id
                    });

                }
               
            } catch (error) {
                //console.log(error);
            }

            setTimeout(() => {
                
                setCargando(!cargando);
            }, 300);
            
            

        }
        obtenerDatosInventario();
        
    },[]);

    useEffect(() => {
        console.log('Entro al useefect2')
        console.log(marcaSeleccionada.marca)
        console.log(marcaSeleccionada.marca)
      //  setMarcaSeleccionada({ marca: inventario.marca});
        const obtenerModelos= async () => {
       
            let url =`http://localhost:4000/api/modelo`;
          
            let response = await fetch(url);
                  
            // const respuesta = await fetch(url);
            let resultadoModelos = await response.json();
            
            // console.log(resultadoModelos);
            let nuevoModelos = [];
            resultadoModelos.map(modelo => {
                if(modelo.marca === parseInt(marcaSeleccionada.marca)){
                    nuevoModelos.push(modelo);
                }
             });
            
             setModelos(nuevoModelos);

    
        }
        obtenerModelos();      
       
    },[marcaSeleccionada]);

    
    
    const actualizarMarca = (e) => {
        e.preventDefault();
        setMarcaSeleccionada({
            ...marcaSeleccionada,
            [e.target.name] : e.target.value
        });

        setInventario({
            ...inventario,
            [e.target.name] : e.target.value
        });
    }
    const actualizarModelos = (e) => {
        e.preventDefault();
        console.log( e.target.value);
        setModeloSeleccionado({
            ...modeloSeleccionado,
            [e.target.name] : e.target.value
        });

        setInventario({
            ...inventario,
            [e.target.name] : e.target.value
        });
    }

    //useState de para guardar la modelo
    const actualizarInventario= (e) => {
        e.preventDefault();
        
        const esValido = e.target.validity.valid;
        if (esValido) {
            setInventario({
                ...inventario,
                [e.target.name] : e.target.value
            });
        }
    }


    //Guardar registro
    const guardarRegistro = async (e)  => {
        e.preventDefault();

        console.log(Object.keys(inventario).length);
        if( Object.keys(inventario).length < 7 ){
            //mandar mensaje de validación
            setError(true);
            return;
        }
        console.log('paso la validacion');
        //console.log(Object.keys(modelo.tipo));
        //Validar que seleccione los datos correctos
        if(inventario.color.trim()  ===""
            || inventario.kilometraje ===0
            || inventario.cantidad ===0
            || inventario.tipo === "-1"
            || inventario.modelo === "-1" 
            || inventario.marca === "-1" )
          {
             //mandar mensaje de validación
             setError(true);
             return;
            }
        
        
        setError(false);
            
        let url ;
        let metodo ;
        if(!esNuevo){
            url =  `http://localhost:4000/api/inventario/${inventario.id}`;
            metodo = 'PUT';
            //console.log('Se actualizo');
        }else{
            url =  'http://localhost:4000/api/inventario';
            metodo ='POST';
            //console.log('Se inserto');
        }

        try {
            let request;
    
            request = await fetch(url,{
                method: metodo,
                body: JSON.stringify (inventario),
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
           navigate('/inventario');
        })     
    }

    
    //Regresar al catálogo de marcas
    const regresarInventario = (e) => {
        e.preventDefault();
        navigate('/inventario');
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
                    <StyleHeader>Inventario</StyleHeader>
                </div>
                <StyleDivButton className='col-7'>   
                    <button className='btn btn-secondary'
                        onClick={regresarInventario} > 
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
                        <StyleDiv><label>Id inventario:</label></StyleDiv>
                            <input 
                                type="text" 
                                name="id"
                                disabled
                                className="form-control" 
                                id="id" 
                                value={ inventario.id  ? inventario.id : ''   }
                                placeholder='Id inventario'
                            />
                        </div>
                    :null
                }
                <div className='row'>
                    <div className="form-group col-6">
                        <StyleDiv ><label>Marca:</label></StyleDiv>
                    <select 
                        id="marca"
                        name="marca"
                        value={marcaSeleccionada  ? marcaSeleccionada.marca : "-1"  }
                        onChange={actualizarMarca}
                        className='custom-select' >
                        <option value="-1"  >Seleccione una marca</option>
                        {
                            marcas.map(marca => 
                                <OpcionesSelect 
                                    key={marca.id}
                                    opciones={marca}
                                />
                            )    
                        }

                    </select>
                    </div>
                    <div className="form-group col-6">
                        <StyleDiv ><label>Modelo:</label></StyleDiv>
                    <select 

                    
                        id="modelo"
                        name="modelo"
                        value={modeloSeleccionado  ? modeloSeleccionado.modelo : "-1"  }
                        onChange={actualizarModelos}
                        className='custom-select' >
                        <option value="-1"  >Seleccione un modelo</option>
                        {
                            modelos.map(modelo => 
                                <OpcionesSelect 
                                    key={modelo.id}
                                    opciones={modelo}
                                />
                            )    
                        }

                    </select>
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-6">
                    <StyleDiv><label>Año:</label></StyleDiv>
                        <input 
                            type="text" 
                            name="year"
                            className="form-control" 
                            id="year" 
                            onChange={actualizarInventario}
                            value={ inventario.year  ? inventario.year : ''   }
                            placeholder='Año'
                        />
                    </div>
                    <div className="form-group col-6">
                        <StyleDiv ><label>Tipo:</label></StyleDiv>
                    <select 
                        id="tipo"
                        name="tipo"
                        className='custom-select'
                        onChange={actualizarInventario}
                        value={tipoSeleccionado ? tipoSeleccionado.tipo : "-1"  }
                        >
                        <option value="-1">Seleccione un tipo</option>
                        {
                            tipos.map(tipo => 
                                <OpcionesSelect 
                                    key={tipo.id}
                                    opciones={tipo}
                                />
                            )    
                        }
                    </select>
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-6">
                    <StyleDiv><label>Color:</label></StyleDiv>
                        <input 
                            type="text" 
                            name="color"
                            className="form-control" 
                            id="color" 
                            value={ inventario.color  ? inventario.color : ''   }
                            placeholder='Color'
                            onChange={actualizarInventario}
                        />
                    </div>
                    <div className="form-group col-6">
                    <StyleDiv><label>Cantidad:</label></StyleDiv>
                        <input 
                            type="text" 
                            name="cantidad"
                            className="form-control" 
                            id="cantidad" 
                            value={ inventario.cantidad  ? inventario.cantidad : ''   }
                            placeholder='cantidad'
                            onChange={actualizarInventario}
                        />
                    </div>
                   
                </div>
                <div className='row'>
                    <div className="form-group col-6">
                    <StyleDiv><label>Kilometraje:</label></StyleDiv>
                        <input 
                            type="text" 
                            name="kilometraje"
                            className="form-control" 
                            id="kilometraje" 
                            value={ inventario.kilometraje  ? inventario.kilometraje : ''   }
                            placeholder='kilometraje'
                            pattern="[0-9]{0,13}"
                            onChange={actualizarInventario}
                        />
                    </div>
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
                    mensaje='Todos los campos son obligatorios'
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
 
export default InventarioAcciones;