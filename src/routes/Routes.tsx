import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Finance from '../pages/Finance';
import Workout from '../pages/Workout';
import Routine from '../pages/Routine';
import Diet from '../pages/Diet';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Finance />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/workout" element={<Workout />} />
      <Route path="/routine" element={<Routine />} />
      <Route path="/diet" element={<Diet />} />
    </Routes>
  );
}
