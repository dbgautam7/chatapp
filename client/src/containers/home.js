import React, { useEffect, useState } from 'react'
import List from '../components/list'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

    const [userList,setUserList]=useState([])

    const GetUserLists=async(values)=>{
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        }
        try {
            const res = await fetch(`http://localhost:3003/users`, requestOptions);
          const data = await res.json()
          setUserList(data.userList)
           
        } catch (error) {
           console.log(error)
        }
    }

    useEffect(()=>{
        GetUserLists()
    },[])


    return (
        <div className="container">
            <h3 className="text-center mb-4">
                <small className="text-muted">Let's get connected to each other</small>
            </h3>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <List userList={userList} />
                </div>
            </div>
        </div>
    )
}

export default Home