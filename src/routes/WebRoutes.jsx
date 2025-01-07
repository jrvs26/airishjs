import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../views/Home';
function WebRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Navigate to="/airishjs/" />} />
        <Route path='/airishjs/' element={<Home />} />
    </Routes>
  )
}

export default WebRoutes
