import { useState } from "react/cjs/react.development";

const Error = (props) => {
    
    return (         
        <div className={props.tipo} role="alert">
        {props.mensaje}
        </div>
     );
}
 
export default Error;
