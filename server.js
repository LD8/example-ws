const WebSocket = require('ws')
const { createServer } = require('http')
const server = createServer()
const wss = new WebSocket.Server({ server })

wss.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('message', (message) => {
    // const parsedMessage = JSON.parse(message.toString())
    wss.clients.forEach((client) => {
      // console.log('sent')
      // if (client !== socket && client.readyState === WebSocket.OPEN) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
        // setTimeout(() => client.send(message), 3000)
      }
    })
  })

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

// server.on('upgrade', (req, socket, head) => {
//   wss.handleUpgrade(req, socket, head, (socket) => {
//     wss.emit('connection', socket, req)
//   })
// })

const PORT = 8081

server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}...`)
})
