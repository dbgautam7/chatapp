import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from "../redux-toolkit/userSlice"
import { useNavigate } from 'react-router-dom';


const ProfilePicChange = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { _id } = useSelector(state => state.user)
    const [photo, setPhoto] = useState(null)

    const handleSubmit = async () => {
        const formdata = new FormData();
        formdata.append("photo", photo);
        formdata.append("_id", _id);
        const res = await fetch(`http://localhost:3003/profilePicChange`, {
            method: "POST",
            body: formdata,
        });
        const data = await res.json();
        if (data) {
            console.log(data,"data")
            dispatch(setUserDetails(data.userProfilePic))
            navigate('/home')
        }
        else {
            const error = new Error()
            console.log(error)
        }
    };


    return (
        <div className="card text-center mx-auto"
            style={{ marginTop: "250px", width: "400px", height: "300px", backgroundColor: "grey" }}>
            <div className="card-body d-flex justify-content-center align-items-center">
                <div className="file-field">
                    <input type="file" className="card-img-top" onChange={(e) => setPhoto(e.target.files[0])} />
                    <div className="file-path-wrapper mt-3">
                        <button type="button" className="btn btn-primary" onClick={() => handleSubmit()}>Upload Profile Picture</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePicChange