import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import Loading from './loading';

const Messages = (props) => {


  const [showInputField, setShowInputField] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (Object.keys(props.selectedUserDetails).length !== 0) {
      setShowInputField(true);
      setShowModal(true)
    }
  }, [props?.selectedUserDetails]);


  return (
    <>
     {showInputField && (
        <Modal show={showModal} onHide={() => setShowModal(false)} >
          <Modal.Header closeButton >
            <Modal.Title className="text-center">{props.selectedUserDetails.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-3" style={{ backgroundColor: '#f5f5f5', minHeight: '200px' }}>
            <div className='ml-3'>
              {props.loading && <Loading />}
            </div>
              {props.messagesList &&
                props?.messagesList.map((item, index) => {
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
                      <div style={messageContainerStyle}>
                        <p style={messageTextStyle}>{item.message}</p>
                      </div>
                    </li>
                  );
                })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="input-group mt-3">
              <input type="text" className="form-control" placeholder="Send a message" onKeyUp={props.handleChange} />
            </div>
          </Modal.Footer>
        </Modal>
      )}

    </>
  );
};

export default Messages;
