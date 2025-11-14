import React, { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  // load saved theme from localStorage or default to system
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply to HTML root
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
