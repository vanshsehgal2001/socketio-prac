import React from 'react'
import './Message.css'

const Message = ({ user, message, classs }) => {
    return (
        <div className={`msg-box ${classs}`} >
            <span style={{ fontSize: "17px", fontWeight: "bolder", color: "crimson" }} >
                {user}
            </span>
            <div style={{ marginTop: "5px" }} >
                {message}
            </div>
        </div>
    )
}



export default Message
