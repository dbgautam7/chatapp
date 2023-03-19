import React, { useEffect, useState } from 'react'
import List from '../components/list'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
const socket = io("http://localhost:3003");
import Logout from '../components/logout';
import Messages from '../components/messages';

const Home = () => {

  const { _id, name } = useSelector(state => state.user)
  const [userList, setUserList] = useState([])
  const [messagesList, setMessagesList] = useState([])
  const [selectedUserDetails, setSelectedUserDetails] = useState({})
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(true)
  const limit=10
 

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
      const res = await fetch(`http://localhost:3003/messages/${selectedUserDetails._id}/${_id}?limit=${limit}&page=${page}`, requestOptions);
      const data = await res.json()
      setMessagesList(data.messagesList)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchMessagesById(page)
  }, [selectedUserDetails._id, _id])

  const handleInfiteScroll=async()=>{
    console.log("scrollHeight", document.documentElement.scrollHeight)
    try{
      if(window.innerHeight+document.documentElement.scrollTop+1 >= document.documentElement.scrollHeight){
        setPage((prev)=>prev+1)
        setLoading(true)
      }
    }
    catch(err){
      alert(err)
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll",handleInfiteScroll)
    return ()=>removeEventListener("scroll",handleInfiteScroll)
  },[])

  useEffect(() => {
    socket.on('messageRequest', (messageRequest) => {
      setMessagesList([...messagesList,messageRequest])
      fetchMessagesById()
    });
  }, []);
  
  const handleChange = async (e) => {
    e.preventDefault(); // prevent default form submission behavior
    if (e.key === "Enter") {
      const messageRequest = {
        senderId: _id,
        message: e.target.value,
        members: [_id, selectedUserDetails._id],
      };
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageRequest),
        };
        const res = await fetch(`http://localhost:3003/messages`, requestOptions);
        const data = await res.json();
        setMessagesList([...messagesList, data.message]);
        socket.emit("messageRequest", messagesList);
        fetchMessagesById()
      } catch (error) {
        console.log(error);
      }
      e.target.value = "";
    }
  };

  return (
    <>
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-4 col-md-12 mb-5 ml-md-5 order-last order-md-first">
        <div className="user-list bg-light p-3 max-vh-100">
          <h3 className="text-center mb-4">
            <small className="text-muted">Let's get connected to each other</small>
          </h3>
          <List userList={userList} _id={_id} fetchMessagesById={fetchMessagesById} 
          setSelectedUserDetails={setSelectedUserDetails} />
          <Logout />
        </div>
      </div>
      <div className="col-lg-8 col-md-12">
        <Messages messagesList={messagesList} selectedUserDetails={selectedUserDetails} 
          handleChange={handleChange} _id={_id} loading={loading} style={{maxHeight:"100vh"}} />
      </div>
    </div>
  </div>
</>

  )
}

export default Home