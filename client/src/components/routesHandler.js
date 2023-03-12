import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../containers/login';
import Register from '../containers/register';

const RoutesHandler = () => {
  return (
    <div>
<Routes>
    <Route path='/' element={<Register />} />
    <Route path='/login' element={<Login />} />
</Routes>
    </div>
  )
}

export default RoutesHandler