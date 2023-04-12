import "./App.css";
import Boton from "./components/Boton";
import Pantalla from "./components/Pantalla";
import { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  const memArray = ["MU", "M+", "M-", "MR", "MC", "GT"];
  const numArray = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "0",
    "00",
    ".",
  ];
  const numIdArray = [
    "seven",
    "eight",
    "nine",
    "four",
    "five",
    "six",
    "one",
    "two",
    "three",
    "zero",
    "double-zero",
    "decimal",
  ];
  const opsIdArray = ["porcentaje", "potencia", "multiply", "divide"];
  const ops1Array = ["%", "^", "*", "/"];

  const [input, setInput] = useState("0");
  const [power, setPower] = useState(false);

  const powerOffOn = () => {
    setPower(!power);
  };

  /*Agrega a la entrada el valor ingresado...*/
  const addInput = (val) => {
    /*Cuando termina una operación (=), el tipo de dato pasa de String a Number*/
    if (typeof input === "number") {
      /*Si al terminar la operación se ingresa un número, comienza un nuevo cálculo*/
      if (!isNaN(val) || val === ".") {
        clearScreen();
        setInput(val);
      } else {
        /*Pero si al terminar la operación se ingresa un operador, continúa el cálculo anterior */
        setInput(input + val);
      }
    } else {
      /*Si la operación no terminó (todavía es String)...*/

      /*Se borra el 0 a la izquierda al ingresar el primer valor/operador*/
      if (input.charAt(0) === "0") {
        setInput(input.substring(1) + val);

        /*El último operador ingresado es el que cuenta (exceptuando el "-")*/
      } else if (
        input.charAt(input.length - 1).match(/[+/%*^]/) &&
        val.match(/[+*/%^]/)
      ) {
        setInput(input.slice(0, -1) + val);

        /*Casos particulares. Ej: (*-+) en ese caso, la operación a realizar es la última (+)
      } else if ( ( input.charAt(input.length - 2).match( /[/%*^]/ ) && val.match( /[+]/) )) {
        setInput(input.slice(0,-2) + val)
      
        /*Si se ingresa un "." no se puede volver a ingresar otro hasta no ingresar un operador*/
      } else if (input.match(/\.\d*$/g) && val === ".") {
        /*Si no sucede nada de lo anterior, se ingresa el valor normalmente*/
      } else {
        setInput(input + val);
      }
    }
  };

  /*Borra el último valor al clickear backspace*/
  const backSpace = () => {
    try {
      setInput(input.slice(0, -1));
    } catch (error) {}
  };

  /*Cambia de signo SOLO si lo que hay en pantalla es un número*/
  const changeSing = () => {
    if (!isNaN(input)) {
      setInput(input * -1);
    }
  };

  /*Limpia la pantalla y vuelve el input a 0*/
  const clearScreen = () => {
    setInput("0");
  };

  /*Calcula y muestra el resultado*/
  const showResult = () => {
    setInput(evaluate(input));
  };

  return (
    <div className="App">
      <div className="div-principal">
        <div className="div-pantalla">
          <Pantalla id="display" input={input}></Pantalla>
        </div>

        <div className="div-botones">
          <div className="div-mem">
            {memArray.map((_, index) => (
              <Boton power={power} key={index}>
                {memArray[index]}
              </Boton>
            ))}
          </div>

          <div className="div-clear">
            <Boton power={power} onClick={powerOffOn}>
              AC
            </Boton>
            <Boton power={power} onClick={changeSing}>
              ±
            </Boton>
            <Boton power={power} onClick={backSpace}>
              ⌫
            </Boton>
            <Boton id="clear" power={power} onClick={clearScreen}>
              C
            </Boton>
          </div>

          <div className="div-numeros">
            {numArray.map((_, index) => (
              <Boton
                id={numIdArray[index]}
                key={index}
                input={input}
                onClick={addInput}
              >
                {numArray[index]}
              </Boton>
            ))}
          </div>

          <div className="div-ops1">
            {ops1Array.map((_, index) => (
              <Boton
                id={opsIdArray[index]}
                key={index}
                power={power}
                onClick={addInput}
              >
                {ops1Array[index]}
              </Boton>
            ))}
          </div>

          <div className="div-mas">
            <Boton id="add" onClick={addInput}>
              +
            </Boton>
          </div>

          <div className="div-ops2">
            <Boton id="subtract" onClick={addInput}>
              -
            </Boton>
            <Boton id="equals" onClick={showResult}>
              =
            </Boton>
          </div>
        </div>
      </div>
      <div className="firma">by Caballou 🐴</div>
    </div>
  );
}

export default App;
