const express = require('express')
const cors = require("cors")
const http = require("http")
require('dotenv').config()
const socketIO = require("socket.io")

const PORT = process.env.PORT_NO || 5000

const app = express()
app.use(express.json())
app.use(cors())
const server = http.createServer(app)

const mainSocket = socketIO(server)

const totalUsers = [{}]

mainSocket.on('connection', (socket) => {
    console.log("New Connection is Established...")

    /// New Joinee, and other new Joinee's connection logic
    socket.on('joined', (data) => {
        totalUsers[socket.id] = data
        console.log(data)
        socket.broadcast.emit('userJoined', {user: 'Admin', message: `${totalUsers[socket.id]} has Joined`})
        socket.emit('welcome', {user: 'Admin', message: 'Welcome to the chat'})
    })

    /// Disconnecting the socket...
    socket.on('disconnect', () => {
        socket.broadcast.emit('userLeft', {user: 'Admin', message: `${totalUsers[socket.id]} has Left`})
    })

    /// Adding a message...
    socket.on('message', ({message}) => {
        mainSocket.emit('sendMessage', {user: totalUsers[socket.id], message})
    })

})


server.listen(PORT, () =>{
    console.log(`Server is Listening to the port No: ${PORT}`)
})



