import React from "react";
import "../style.css";


export default function die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die-face" onClick={props.holdDice} style={styles}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
