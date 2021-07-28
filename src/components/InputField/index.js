import React, { useState } from "react";
import IconEye from "../../assets/icons/eye.svg";
import IconEyeOff from "../../assets/icons/eye-off.svg";
import style from "./style.module.css";

function InputField(props) {
  const [eye, setEye] = useState(false);

  return (
    <div className={style.container} style={props.styleContainer} >
      <div className={style.label}>{props.label}</div>
      <div className={style.containerInput} >
        {props.isIconRight ? <img src={props.iconRight} alt="icon" /> : null}
        <input
          required ={props.required}
          onKeyDown={props.keyDown}
          onKeyUp={props.keyUp}
          name={props.name}
          type={eye ? "text" : props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
        />
        {props.isIconLeft ? (
          <img
            src={eye ? IconEye : IconEyeOff}
            onClick={() => setEye(!eye)}
            alt="icon"
          />
        ) : null}
      </div>
    </div>
  );
}

export default InputField;
