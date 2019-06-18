import { useState } from "react";

export function useToggler(initialState) {
  const [state, setState] = useState(initialState);

  const setTrue = () => setState(true);

  const setFalse = () => setState(false);

  const toggle = () => setState(!state);

  return [state, setTrue, setFalse, toggle];
}
