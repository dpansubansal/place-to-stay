// import React from 'react'

import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const INITIAL_STATE = {
  currentUser: null,
  openLogin: false,
  alert: { open: false, servity: "info", msg: "" },
  loading: false,
  profile: { open: false, file: null, photoUrl: "" },
};

const CONTEXT = createContext(INITIAL_STATE);

export const useValue = () => {
  return useContext(CONTEXT);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  },[]);
  return (
    <CONTEXT.Provider value={{ state, dispatch }}>{children}</CONTEXT.Provider>
  );
};

export default ContextProvider;
