import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const StyledButton = styled.button`
    margin-right: 1rem;
    font-size: .8rem;
`;


const InventarioTable = ({inventario}) => {
    const navigate = useNavigate();

    const eliminarRegistro= (e) =>{
        e.preventDefault();
       
        //Mandar llamar el mensaje de si esta seguro que se desea eliminar el registro
         
        const MySwal = withReactContent(Swal)

        Swal.fire({
            position: 'center',
            icon: 'question',
            title: '¿Desea eliminar el registro seleccionado?',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar'
            
        
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              //eliminar el registro
              eliminar();
            } 
        })
    }

    const eliminar = async () => {
        try {
            
            let request;
            const url =  `http://localhost:4000/api/inventario/${inventario.id}`;
    
            request = await fetch(url,{
                method:'DELETE'
              
            });
    
            await request.json();

            //mandar mensaje de eliminado exitosamente
             //mandar mensaje de exito    
            const MySwal = withReactContent(Swal)

            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro eliminado exitosamente',
                showConfirmButton: false,
                timer: 1500,
                
            
            }).then(() => {
                //Refrescar la pagina
                window.location.reload(false)
            })     
    
        }catch(error){
            console.log(error);
        }

    }
    return (
        <tr >
            <td >{inventario.id}</td>
            <td >{!inventario.DataMarca[0] ? '' :  inventario.DataMarca[0].nombre}</td>
            <td >{!inventario.DataModelo[0] ? '' :  inventario.DataModelo[0].nombre}</td>
            <td >{inventario.year}</td>
            <td >{!inventario.DataTipo[0] ? '' :  inventario.DataTipo[0].nombre}</td>
            <td >{inventario.color}</td>
            <td >{inventario.cantidad}</td>
            <td >{inventario.kilometraje}</td>
            <td >
                <StyledButton className='btn btn-primary' name="editar"
                    onClick={() => navigate(`/inventarioacciones/${inventario.id}`)}
                >
                    <FontAwesomeIcon icon={faEdit} className='mr-2' />
                    Editar
                </StyledButton>
                <StyledButton className='btn btn-danger' name="eliminar"
                    onClick={eliminarRegistro}
                >
                    <FontAwesomeIcon icon={faMinusCircle} className='mr-2' />
                    Eliminar
                </StyledButton>
            </td>
        </tr>
    );
}
 
export default InventarioTable;