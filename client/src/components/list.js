import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react'
import io from 'socket.io-client';

const socket = io("http://localhost:3003");

const List = ({userList}) => {

    useEffect(() => {
        socket.on('connection');
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div class="container-fluid">
        <div class="user-list bg-light p-3" style={{width:"500px",maxHeight:"100vh"}}>
          <ol class="list-group list-group-numbered bg-white">
            {userList.map((item,id)=>{
             return (
             <li class="list-group-item">{item.name}</li>
             )
            })}
          </ol>
        </div>
      </div>
      
    )
}

export default List