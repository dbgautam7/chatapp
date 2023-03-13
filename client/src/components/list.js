import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'


const List = ({userList}) => {
    console.log(userList,"userList")
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