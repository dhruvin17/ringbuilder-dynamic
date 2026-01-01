// src/context/DataContext.js
import { createContext, useContext } from "react";

export const DataContext = createContext(null);

export const useData = () => useContext(DataContext);