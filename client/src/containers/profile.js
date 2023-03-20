import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logout from '../components/logout'
import blankPicture from '../images/blankPicture.png'

const Profile = () => {
    const { name,photo } = useSelector(state => state.user)
    console.log("photo",photo)

  return (
    <div className="card w-80 my-3 p-3">
      {photo ?(
      <img src={require(`../images/${photo}`)} alt="Loading.." />
      ):
     (
  <img src={blankPicture} className="card-img-top" alt="Image" />
     )
      }
  <div className="card-body">
    <Link className="btn btn-primary" to='/home/profilePictureChange'>Change Profile Picture</Link>
    <h5 className="card-title">{name}</h5>
    <Logout />
  </div>
</div>
  )
}

export default Profile