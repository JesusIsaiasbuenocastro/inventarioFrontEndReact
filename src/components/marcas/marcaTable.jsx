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

const MarcaTable = ({marca}) => {
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
            const url =  `http://localhost:3004/marca/${marca.id}`;
    
            request = await fetch(url,{
                method:'DELETE'
              
            });
    
            const resultado = await request.json();
            console.log(request);
            console.log(resultado);

            //mandar mensaje de eliminado exitosamente
    
        }catch(error){
            console.log(error);
        }

    }


    return (
        <tr >
            <td >{marca.id}</td>
            <td >{marca.nombre}</td>
            <td >
                <StyledButton className='btn btn-primary' name="editar"
                    onClick={() => navigate(`/marcaacciones/${marca.id}`)}
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
 
export default MarcaTable;