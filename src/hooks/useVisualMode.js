import { React, useState } from "react";


export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const transition = (value, replace) => {
    const historyCopy = [...history];
    if (replace && history.length > 0) {
      historyCopy[historyCopy.length - 1] = value;
      setHistory(historyCopy);
    } else {
      setHistory([...history, value]);
    }
  }

  const back = () => {
    const historyCopy = [...history];
    if (historyCopy.length > 1) {
      historyCopy.pop();
      setHistory(historyCopy);
    }
  }

    return { mode: history[history.length - 1], transition, back };
  
  }
