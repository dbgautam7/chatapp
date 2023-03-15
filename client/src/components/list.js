import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
// import io from 'socket.io-client';
// const socket = io("http://localhost:3003");
import { useSelector} from 'react-redux';
const List = ({userList,selectedUserDetails,messagesList}) => {

  console.log(selectedUserDetails,messagesList)
  const { _id} = useSelector(state => state.user)
  // console.log(_id,"_id")

  //   useEffect(() => {
  //       socket.on('connection');
  //       return () => {
  //           socket.disconnect();
  //       };
  //   }, []);

    return (
        <div className="container-fluid">
        <div className="user-list bg-light p-3" style={{width:"500px",maxHeight:"100vh"}}>
          <ol className="list-group list-group-numbered bg-white">
            {userList.map((item,id)=>{
              if(item._id !==_id)
             return (
             <li className="list-group-item">{item.name}</li>
             )
            })}
          </ol>
        </div>
      </div>
      
    )
}

export default List