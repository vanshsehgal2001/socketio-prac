const express = require('express');
const http = require('http')
const cors = require('cors')
const socketIO = require('socket.io')

const app = express()
const PORT = process.env.PORT || 8000

let users = []

app.use(cors())
app.get('/', (req, res) => {
    res.send("Hello")
})

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('Connection')

    socket.on('message', ({ user }) => {
        let exists = users.find(user => user.name === user)
        if (exists) {
            return;
        }
        users.push({ id: socket.id, name: user })
        console.log(user)
        socket.broadcast.emit('broadcast-msg', { user: 'Admin', message: `${users.find(user => user.id === socket.id).name} has joined` })
        socket.emit('welcome', { user: 'Admin', message: `Welcome ${users.find(user => user.id === socket.id).name}` })

    })

    socket.on('userMessage', ({ msg, id }) => {
        io.emit('sendMessage', { user: users.find(user => user.id === socket.id).name, message: msg, id: id })
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', { user: 'Admin', message: `${users.find(user => user.id === socket.id).name} has left` })
        // console.log(users)
        // users = users.filter(user => user.id !== socket.id)
        // console.log(users)
    })


})

server.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})