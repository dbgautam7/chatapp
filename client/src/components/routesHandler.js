import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../containers/home';
import Login from '../containers/login';
import Register from '../containers/register';

const RoutesHandler = () => {
  return (
    <div>
<Routes>
    <Route path='/' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/home' element={<Home />} />
</Routes>
    </div>
  )
}

export default RoutesHandler