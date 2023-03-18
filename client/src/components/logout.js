import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setLogoutUser} from '../redux-toolkit/userSlice'

const Logout = () => {

    const navigate = useNavigate()
  const dispatch = useDispatch()
  const triggerLogout = () => {
    dispatch(setLogoutUser())
    navigate('/login')
  }

  return (
    <div>
        <button onClick={()=>triggerLogout()}>Logout</button>
    </div>
  )
}

export default Logout