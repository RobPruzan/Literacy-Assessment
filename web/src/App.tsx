import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import MainPage from './components/MainPage';
import { About } from './components/About/About';
import { CreateComparison } from './components/CreateComparison/CreateComparison';
import { Analysis } from './components/Analysis/Analysis';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/analysis" element={<CreateComparison />} />
          <Route path="/create-comparison" element={<CreateComparison />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
