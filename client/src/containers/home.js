import React, { useEffect, useState } from 'react'
import List from '../components/list'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
const socket = io("http://localhost:3003");

const Home = () => {

  const { _id } = useSelector(state => state.user)
  const [userList, setUserList] = useState([])
  const [messagesList, setMessagesList] = useState([])
  const [selectedUserDetails, setSelectedUserDetails] = useState(null)

  const GetAllUserLists = async (values) => {
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

  useEffect(() => {
    GetAllUserLists()
  }, [])

  const fetchMessages = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify()
    }
    try {
      const res = await fetch(`http://localhost:3003/messages/${selectedUserDetails._id}/${_id}`, requestOptions);
      const data = await res.json()
      console.log(data, "da")
      setMessagesList(data.messagesList)
    } catch (error) {
      console.log(error)
    }
  }

  const postMessage = async (messageRequest) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageRequest),
    };
    try {
      const res = await fetch(`http://localhost:3003/messages`, requestOptions);
      const data = await res.json();
      setMessagesList([...messagesList, data.message]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on('messageRequest', (messageRequest) => {
      postMessage(messageRequest);
    });
  }, []);
  const handleChange = (e) => {
    if (e.key === 'Enter') {
      const messageRequest = {
        senderId: _id,
        message: e.target.value,
        members: [_id, selectedUserDetails._id],
      };
      socket.emit('messageRequest', messageRequest);
      postMessage(messageRequest);
      console.log('enter key press');
    } else {
      console.log('enter key not press');
    }
  };


  return (
    <>
      {JSON.stringify(messagesList)}
      <div className="container mb-5">
  <h3 className="text-center mb-4">
    <small className="text-muted">Let's get connected to each other</small>
  </h3>
  <div className="row justify-content-center">
    <div className="col-lg-8 col-md-10">
      <div className="container-fluid">
        <div className="user-list bg-light p-3" style={{ width: "500px", maxHeight: "100vh" }}>
          <ol className="list-group list-group-numbered bg-white">
            {userList.map((item, id) => {
              if (item._id !== _id)
                return (
                  <div key={id}>
                    <li className="list-group-item d-flex justify-content-between align-items-center"
                      onClick={() => {
                        setSelectedUserDetails(item)
                        fetchMessages()
                      }}
                    >
                      <span>{item.name}</span>
                    </li>
                  </div>
                )
            })}
          </ol>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="container">
  <div className="row">
    <div className="col-md-12">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="w-40 ">
          <h1>{selectedUserDetails.name}</h1>
          <div className="input-group mb-2">
            <input type="text" className="form-control" placeholder="Send a message" onKeyUp={handleChange} />
          </div>
          {messagesList?.map((item) => {
            return <li style={{ backgroundColor: item.senderId === _id ? 'grey' : 'green' }}>{item.message}</li>
          })}
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Home