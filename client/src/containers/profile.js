import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Logout from '../components/logout'
import noProfileImg from '../images/noProfileImg.jpg'

const Profile = () => {

    const { _id, name } = useSelector(state => state.user)
    const [photo,setPhoto]=useState(null)

    const handleSubmit = async () => {
        const formdata = new FormData();
        formdata.append("avatar", photo);
        formdata.append("_id", _id);
        const res = await fetch(`http://localhost:3003/profilePicChange`, {
          method: "POST",
          body: formdata,
        });
        const data = await res.json();
        if (data) {
          console.log(data)
        }
        else{
            const error=new Error()
            console.log(error)
        }
      };


  return (
    <div className="card w-50 my-3 p-3">
  <img src={noProfileImg} className="card-img-top" alt="Image" />
  <div className="card-body">
    <input type="file" onChange={(e)=>setPhoto(e.target.files[0])} />
  <button type="button" className="btn btn-outline-primary" onClick={()=>handleSubmit()}>Change Profile Picture</button>
    <h5 className="card-title">{name}</h5>
    <Logout />
  </div>
</div>
  )
}

export default Profile