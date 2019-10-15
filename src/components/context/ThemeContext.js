import { createContext } from 'react';

export const themes = {
  light: {
    background: '#eeeeee'
  },
  dark: {
    background: '#222222'
  }
};

export const ThemeContext = createContext({ theme: themes.light, toggleTheme: () => {} });
