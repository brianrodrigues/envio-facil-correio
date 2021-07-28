import React from 'react';
import style from "./textfield.module.css"
// import { Container } from './styles';

function TextField(props) {
  return (
     <div className={style.container} style={props.styleContainer}>
       <p className={style.fontTitle}>{props.title}:</p>
       <p>{props.value}</p>
     </div>
  );
}

export default TextField;