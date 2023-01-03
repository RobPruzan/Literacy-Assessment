import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import MainPage from './components/MainPage';
import { About } from './components/About/About';
import { CreateComparison } from './components/CreateComparison/CreateComparison';
import { Analysis } from './components/Analysis/Analysis';
import { createTheme } from '@mui/material';
import Loading from './components/Loading';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/create-comparison" element={<CreateComparison />} />
          <Route path="/compare/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
