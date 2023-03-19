import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'

const List = ({userList,_id,fetchMessagesById,setSelectedUserDetails}) => {
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
                  <i className="bi bi-chevron-right"></i>
                </li>
              </div>
            )
        })}
      </ol>
    </>
  )
}

export default List