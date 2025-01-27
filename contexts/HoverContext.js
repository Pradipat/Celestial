'use client';

import { createContext, useContext, useState } from 'react';

const HoverContext = createContext();

export function HoverProvider({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </HoverContext.Provider>
  );
}

export function useHover() {
  return useContext(HoverContext);
}
