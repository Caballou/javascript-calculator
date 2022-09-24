import React from "react";
import '../stylesheets/Boton.css'

function Boton(props){
  const esOperador = (valor) => {
    return isNaN(valor) && (valor !== '.');
  };

  return (
    <div
      className={`boton-contenedor ${props.children === 'C' ? 'boton-clear' : ''}
      ${esOperador(props.children) ? 'operador' : ''}`.trimEnd()}
      onClick={() => {
          if (( props.input === '0' && 
          (props.children === '0' || props.children === '00')
          )) {

          } else {
            props.onClick(props.children)
          } 
        }}
        id={props.id}>
      {props.children}
    </div>
  );
}

export default Boton;