import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { About } from './components/About/About';
import { Analysis } from './components/Analysis/Analysis';
import { CreateComparison } from './components/CreateComparison/CreateComparison';
import Loading from './components/Loading';
import MainPage from './components/MainPage';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F4774F',
    },
    secondary: {
      main: '#6B7280',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        whiteSpace: 'unset',
        wordBreak: 'break-all',
      },
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/create-comparison" element={<CreateComparison />} />
            <Route path="/compare/loading" element={<Loading />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
