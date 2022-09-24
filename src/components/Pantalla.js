import React from "react";
import '../stylesheets/Pantalla.css'

const Pantalla = (props) => (
  
  <div className='pantalla'>
    <div className='div-letras'>
      GT  <br />
      M   <br />
      -   <br />
      E   <br />
    </div>
    <div className='input' id={props.id}>
      {props.input} 
    </div>
  </div>
);

export default Pantalla;