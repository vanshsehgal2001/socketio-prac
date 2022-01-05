import React, { useEffect, useState } from 'react'
import { user } from '../Home/Home'
import socketIO from 'socket.io-client'
import './Chat.css'
import Message from '../Message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import { useNavigate } from 'react-router-dom'


const URL = "http://localhost:8000"
let socket;
const Chat = () => {

    const sendMsg = () => {
        const msg = document.getElementById('inp').value
        console.log(msg)
        if (!msg) {
            return;
        }
        socket.emit('userMessage', { msg, id })
        document.getElementById('inp').value = ''
    }

    const [messages, setMessages] = useState([])
    const [id, setId] = useState('')

    useEffect(() => {
        socket = socketIO(URL, { transports: ['websocket'] })

        socket.on('connect', () => {
            console.log('connect')
            setId(socket.id)
        })

        socket.emit('message', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data])
        })

        socket.on('broadcast-msg', (data) => {
            setMessages([...messages, data])

        })

        socket.on('left', (data) => {
            setMessages([...messages, data])

        })

        return () => {
            socket.emit('disconnect')
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])

            console.log(data.user, data.message)
        })
        return () => {
            socket.off()
        }
    }, [messages])

    const navigate = useNavigate()
    console.log("id : ", id)
    if (!id) {
        navigate('/')
    }

    return (
        <div className="chat-container" >
            <div className="chat-box" >
                <div className="chat-heading" >

                    <div>
                        Chat Cafe
                    </div>
                    <a href="/" >
                        <i className="fa fa-times">

                        </i>
                    </a>


                </div>
                <ReactScrollToBottom className="chat-messages" >
                    {messages.length > 0 && messages.map((msg, i) => {
                        return (
                            <Message user={msg.id === id ? 'You' : msg.user} message={msg.message} classs={msg.id === id ? 'right' : 'left'} key={i} />
                        )
                    })}
                </ReactScrollToBottom>
                <div className="chat-input" >
                    <textarea onKeyUp={e => e.code === 'Enter' ? sendMsg() : null} id="inp" />

                    <button onClick={sendMsg} >
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat
