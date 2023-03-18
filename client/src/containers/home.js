import React, { useEffect, useState } from 'react'
import List from '../components/list'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
const socket = io("http://localhost:3003");
import img from "../images/srijan.png"

const Home = () => {

  const { _id, name } = useSelector(state => state.user)
  const [userList, setUserList] = useState([])
  const [messagesList, setMessagesList] = useState([])
  const [selectedUserDetails, setSelectedUserDetails] = useState({})
  const [showInputField, setShowInputField] = useState(false)

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

  const fetchMessagesById = async () => {
    if (!selectedUserDetails._id || !_id) return;

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify()
    }
    try {
      const res = await fetch(`http://localhost:3003/messages/${selectedUserDetails._id}/${_id}`, requestOptions);
      const data = await res.json()
      console.log(data, "data")
      setMessagesList(data.messagesList)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchMessagesById()
  }, [selectedUserDetails._id, _id])

  // useEffect(() => {
  //   socket.on('messageRequest', (messageRequest) => {
  //     const backUpMessage = [...messagesList]
  //     backUpMessage.push(messageRequest)
  //     postMessage(backUpMessage);
  //     fetchMessagesById()
  //   });
  // }, []);
  
  const handleChange = async (e) => {
    if (e.key === "Enter") {
      const messageRequest = {
        senderId: _id,
        message: e.target.value,
        members: [_id, selectedUserDetails._id],
      };
      socket.emit("messageRequest", messageRequest);
  
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageRequest),
        };
        const res = await fetch(`http://localhost:3003/messages`, requestOptions);
        const data = await res.json();
        setMessagesList([...messagesList, data.message]);
        fetchMessagesById()
      } catch (error) {
        console.log(error);
      }
  
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (Object.keys(selectedUserDetails).length !== 0) {
      setShowInputField(true);
    }
  }, [selectedUserDetails]);


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-5 ml-md-5">
            <h3 className="text-center mb-4">
              <small className="text-muted">Let's get connected to each other</small>
            </h3>
            <div className="user-list bg-light p-3 w-100 max-vh-100">
              <ol className="list-group list-group-numbered bg-white">
                {userList.map((item, id) => {
                  if (item._id !== _id)
                    return (
                      <div key={id}>
                        <li className="list-group-item d-flex justify-content-between align-items-center"
                          onClick={async () => {
                            setSelectedUserDetails(item)
                            await fetchMessagesById()
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

          <div className="col-lg-8 col-md-12">
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="w-75">
                {showInputField ? (
                  <>
                    <h1>{selectedUserDetails.name}</h1>
                    <div style={{ padding: "20px" }}>
                      {messagesList.map((item, index) => {
                        const isSentByMe = item.senderId === _id;
                        const messageContainerStyle = {
                          display: 'inline-block',
                          maxWidth: '80%',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          backgroundColor: isSentByMe ? 'lightblue' : 'lightgreen',
                          color: isSentByMe ? 'black' : 'white',
                          textAlign: isSentByMe ? 'right' : 'left',
                        };
                        const messageTextStyle = {
                          margin: 0,
                        };
                        return (
                          <li
                            key={index}
                            style={{
                              display: 'flex',
                              justifyContent: isSentByMe ? 'flex-end' : 'flex-start',
                              alignItems: 'center',
                              margin: '10px 0',
                            }}
                          >
                            {!isSentByMe && (
                              <img
                                src={img}
                                alt="Image"
                                style={{ marginRight: '10px',height:"30px", width:"30px", borderRadius:"5px" }}
                              />
                            )
                            }
                            <div style={messageContainerStyle}>
                              <p style={messageTextStyle}>{item.message}</p>
                            </div>
                          </li>
                        );
                      })}
                    </div>
                    <div className="input-group mb-2">
                      <input type="text" className="form-control" placeholder="Send a message" onKeyUp={handleChange} />
                    </div>
                      {/* <h3>{name}</h3> */}
                  </>
                ) : (
                  <h3 className="text-center text-primary">Select a user to start chatting</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home