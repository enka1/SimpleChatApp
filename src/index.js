const http = require('http')
const express = require('express');

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

let users = 0

io.on('connection', socket => {
  users++;
  io.emit('user_count', {users});
  socket.on('disconnect', () => {
    users--;
    io.emit('user_count', {users});
  })
  socket.on('user_join', () => {
    io.emit('user_count', {users});
  })
  socket.on('send_msg', data => {
    io.emit('receive_msg', {
      user_name: data.user,
      msg: data.msg,
      user_id: socket.id
    })
  })
})

server.listen(3001)