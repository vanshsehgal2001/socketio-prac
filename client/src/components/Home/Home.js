import React, { useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

let user;

const userFunc = () => {
    user = document.getElementsByTagName('input')[0].value;
    document.getElementsByTagName('input').value = ''
}

const Home = () => {

    const [name, setName] = useState('')

    return (
        <div className="home-container" >
            <h1 className="home-heading-h1" >
                Chat Cafe
            </h1>
            <div className="home-join" >
                <h3 className="home-heading-h3" >
                    Join Room
                </h3>
                <input onChange={e => setName(e.target.value)} placeholder="Enter name" type="text" className="home-input" />
                <Link to="/chat" onClick={e => !name ? e.preventDefault() : null} >
                    <button className="join-btn" onClick={userFunc} >
                        Join
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home
export { user }
