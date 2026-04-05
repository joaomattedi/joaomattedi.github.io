import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Finance from '../pages/Finance';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/finance" element={<Finance />} />
    </Routes>
  );
}
