import React from "react";
import "./style.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

let number = 0;

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [record, setRecord] = React.useState(999);

  React.useEffect(() => {
    if (!tenzies) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      if (seconds < record && seconds !== 0) {
        setRecord((prevRecord) => (prevRecord = seconds));
        setSeconds(0);
      } else {
        setSeconds(0);
      }
      return function () {
        clearInterval(interval);
      };
    } else {
      setSeconds(seconds);
    }
  }, [tenzies]);

  React.useEffect(() => {
    const allHeld = dice.every((el) => el.isHeld);
    const sameValue = dice.every((el) => el.value === dice[0].value);

    if (allHeld && sameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      number = 0;
    } else {
      setDice((prevDice) =>
        prevDice.map((x) => {
          return x.isHeld === true ? x : generateNewDie();
        })
      );
      number++;
    }
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((x) => {
        return x.id === id ? { ...x, isHeld: !x.isHeld } : x;
      });
    });
  }

  const diceElements = dice.map((item) => {
    return (
      <Die
        key={item.id}
        value={item.value}
        isHeld={item.isHeld}
        holdDice={() => holdDice(item.id)}
      />
    );
  });
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div>Number of rolls: {number}</div>
      <div className="time"> Elapsed time: {seconds} </div>
      <div className="newRecord"> New record: {record}</div>
    </main>
  );
}
