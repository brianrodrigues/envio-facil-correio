import React from 'react';
import './style.css';


function Checkbox(props) {
  return (
    <div className="containerCheckbox">
      <input type="checkbox" name={props.name} id={props.id}/>
      <label htmlFor={props.name}>{props.title}</label>
    </div>

  );
}

export default Checkbox;