import { useState, useEffect } from "react";

export function useInput() {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
  });

  const keys: { [key: string]: keyof typeof input } = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (keys[e.code]) {
      setInput((m) => ({ ...m, [keys[e.code]]: true }));
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (keys[e.code]) {
      setInput((m) => ({ ...m, [keys[e.code]]: false }));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return input;
}
