import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5F5F5',
    },
    secondary: {
      main: '#0CA7FF',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
