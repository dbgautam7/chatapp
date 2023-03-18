import React, { useEffect, useState } from 'react'
import img from "../images/srijan.png"
import 'bootstrap/dist/css/bootstrap.min.css';


const Messages = (props) => {

    const [showInputField, setShowInputField] = useState(false)

useEffect(() => {
    if (Object.keys(props.selectedUserDetails).length !== 0) {
      setShowInputField(true);
    }
  }, [props.selectedUserDetails]);

    return (
        <>
      {showInputField ? (
        <div className="col-lg-8 col-md-12">
          <h1>{props.selectedUserDetails.name}</h1>
          <div className="p-3" style={{ backgroundColor: '#f5f5f5', minHeight: '200px' }}>
            {props.messagesList.map((item, index) => {
              const isSentByMe = item.senderId === props._id;
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
                  className={`d-flex justify-content-${isSentByMe ? 'end' : 'start'} align-items-center mb-3`}
                >
                  {!isSentByMe && (
                    <img
                      src={img}
                      alt="User profile"
                      className="rounded-circle me-3"
                      style={{ height: '30px', width: '30px' }}
                    />
                  )}
                  <div style={messageContainerStyle}>
                    <p style={messageTextStyle}>{item.message}</p>
                  </div>
                </li>
              );
            })}
          </div>
          <div className="input-group mt-3">
            <input type="text" className="form-control" placeholder="Send a message" onKeyUp={props.handleChange} />
          </div>
        </div>
      ) : (
        <div className="col-lg-8 col-md-12 d-flex align-items-center justify-content-center">
          <h3 className="text-center text-primary">Select a user to start chatting</h3>
        </div>
      )}
    </>
    )
}

export default Messages