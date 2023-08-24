import React, { useEffect, useState } from 'react'
import './App.css'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8081')
    newSocket.onopen = () => {
      console.log('WebSocket connection established')
    }
    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      console.group('Received message')
      console.log(message)
      console.groupEnd()

      setMessages((prevMessages) => [...prevMessages, message])
    }
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const sendMessage = () => {
    if (input.trim() !== '') {
      const message = {
        text: input,
        timestamp: new Date().toISOString(),
      }

      console.group('Sent message')
      console.log(message)
      console.groupEnd()

      socket.send(JSON.stringify(message))
      setInput('')
    }
  }

  return (
    <div className='chat-container'>
      <div className='message-list'>
        {messages.map((message, index) => (
          <div key={index} className='message'>
            <p className='message-text'>{message.text}</p>
            <p className='message-timestamp'>{message.timestamp}</p>
          </div>
        ))}
      </div>
      <div className='input-container'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your message...'
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>WebSocket Chat App</h1>
      </header>
      <main className='App-main'>
        <Chat />
      </main>
    </div>
  )
}

export default App
