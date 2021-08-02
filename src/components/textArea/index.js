import React,{useState}from "react";

import style from "./style.module.css";

function Textarea(props) {

  const [maxLength,setMaxLength] = useState(150)
  const [count,setCount] = useState(maxLength)

  const handleWordCount = event => {
    const charCount = event.target.value.length;
    setCount(maxLength-charCount)
    if(count <= 10){
      var p = document.querySelector("#countCaracteres")
      p.style.color = "red"
    }else{
      var p = document.querySelector("#countCaracteres")
      p.style.color = "#fff"
    }
  }

  return (
    <div className={style.container} style={props.styleContainer} >
      <div className={style.label}>{props.label}</div>
      <div className={style.containerInput} >
        <textarea name={props.name} onChange={handleWordCount} maxLength={maxLength} type="text" className={style.textarea}></textarea>
      </div>
      <p id="countCaracteres">limite de caracteres : {count}</p>
    </div>
  );
}

export default Textarea;
