import React from 'react';
import "./style.css"
// import { Container } from './styles';

function Button(props) {
  return (
    <button className="containerButton" type={props.type} style={props.style} onClick={props.click}>
      {props.hasIcon ?  <img src={props.icon} height={25} alt="icon"/> : null}
      <h3 style={{"color":props.colorTitle}}>{props.title}</h3>
    </button>
  );
}

export default Button;