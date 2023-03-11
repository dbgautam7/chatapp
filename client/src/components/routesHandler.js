import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Register from '../containers/register';

const RoutesHandler = () => {
  return (
    <div>
<Routes>
    <Route path='/' element={<Register />} />
</Routes>
    </div>
  )
}

export default RoutesHandler