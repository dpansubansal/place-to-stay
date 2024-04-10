// import React from 'react'

import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const INITIAL_STATE = {
  currentUser: null,
  openLogin: false,
  alert: { open: false, servity: "info", msg: "" },
  loading: false,
};

const CONTEXT = createContext(INITIAL_STATE);

export const useValue = () => {
  return useContext(CONTEXT);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <CONTEXT.Provider value={{ state, dispatch }}>{children}</CONTEXT.Provider>
  );
};

export default ContextProvider;
