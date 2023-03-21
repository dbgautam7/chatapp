import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import blankPicture from '../images/blankPicture.png'


const UserList = ({ userList, _id, fetchMessagesById, setSelectedUserDetails }) => {
  return (
    <>
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
                  <span>{item.phoneOrEmail}</span>
                  {item.photo === ""? (
                     <img src={blankPicture} className="card-img-top" alt="Image"
                     style={{ width: "80px", height: "80px", border:"1px solid black", borderRadius:"50%" }} />
                   
                  ):(
                    <img
                      src={require(`../images/${item.photo}`).default}
                      alt="Loading.."
                      style={{ width: "80px", height: "80px", border:"1px solid black", borderRadius:"50%" }}
                    />
                  )
                }
                  <i className="bi bi-chevron-right"></i>
                </li>
              </div>
            )
        })}
      </ol>
    </>
  )
}

export default UserList