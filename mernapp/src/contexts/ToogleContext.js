// src/contexts/ToggleContext.js
import React, { createContext, useState, useContext } from 'react';

const ToggleContext = createContext();

export const useToggle = () => useContext(ToggleContext);

export const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
