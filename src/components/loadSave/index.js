import React from "react";
import style from "./style.module.css";

function LoadSave(props) {

  return (
    <div className={style.container} style={props.hide === false ?{display:"none"}:props.styleContainer} >
      
    </div>
  );
}

export default LoadSave;
