// src/hooks/useTheme.js
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  
  // Extraemos el valor del tema directamente desde el estado atómico de Redux
  const theme = useSelector((state) => state.theme.value);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    theme,
    toggleTheme: handleToggleTheme
  };
};