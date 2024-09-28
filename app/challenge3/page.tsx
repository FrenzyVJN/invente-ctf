"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Skull, User } from 'lucide-react'

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

export default function Challenge3() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [showClue, setShowClue] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const initialMessages: Message[] = [
  {
    "id": 1,
    "sender": "You",
    "content": "I did what you asked. There’s no need for this to go further.",
    "timestamp": "10:30"
  },
  {
    "id": 2,
    "sender": "Unknown",
    "content": "Did you really think it would be that simple, Victor? The secrets you’re hiding—those don’t just disappear.",
    "timestamp": "10:31"
  },
  {
    "id": 3,
    "sender": "You",
    "content": "I gave you everything. You have the keys. What more do you want?",
    "timestamp": "10:32"
  },
  {
    "id": 4,
    "sender": "Unknown",
    "content": "It’s not about what I want anymore. You should’ve known better than to cross me. Your encryption won’t save you.",
    "timestamp": "10:34"
  },
  {
    "id": 5,
    "sender": "You",
    "content": "This wasn’t part of the deal! You promised!",
    "timestamp": "10:35"
  },
  {
    "id": 6,
    "sender": "Unknown",
    "content": "The deal was never in your favor, Victor. You just couldn’t see it. But I’ll give you one last chance to redeem yourself.",
    "timestamp": "10:36"
  },
  {
    "id": 7,
    "sender": "You",
    "content": "What do you mean?",
    "timestamp": "10:37"
  },
  {
    "id": 8,
    "sender": "Unknown",
    "content": "Go to this link. Everything you’re trying to protect is there. What happens next is entirely up to you.",
    "timestamp": "10:38"
  }
]


  useEffect(() => {
    setMessages(initialMessages)
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // API Call to Validate Time and Get Reply Message
  const validateTime = async (time: string) => {
    try {
      const res = await fetch('/api/challenge3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ time }),
      })
      const data = await res.json()

      if (data.success) {
        const responseMessage: Message = {
          id: messages.length + 1,
          sender: 'Unknown',
          content: data.message, // Use the message from API
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        }
        setMessages((prevMessages) => [...prevMessages, responseMessage])
        setShowClue(true)
      } else {
        alert('Invalid time. Try again.')
      }
    } catch (error) {
      console.error('Error validating time:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    // Validate the time with the API call
    validateTime(inputMessage.trim())
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-300">
      <div className="bg-red-900 text-white p-4">
        <h1 className="text-xl font-bold">Mysterious Informant</h1>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div key={message.id} className={`flex mb-4 ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-xs ${message.sender === 'You' ? 'bg-blue-900' : 'bg-gray-800'}`}>
              <div className="flex items-center mb-1">
                <Avatar className="w-6 h-6 mr-2">
                  {message.sender === 'You' ? (
                    <User className="text-blue-500" />
                  ) : (
                    <Skull className="text-red-500" />
                  )}
                </Avatar>
                <span className="font-bold">{message.sender}</span>
              </div>
              <p>{message.content}</p>
              <span className="text-xs opacity-50">{message.timestamp}</span>
            </div>
          </div>
        ))}
        <div className="text-center my-4">
            <p className="text-red-500 font-bold">https://drive.google.com/file/d/1G_UxhSm_umwlHuascTwv780YOFKiQFJT/view</p>
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-800">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter the time..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow bg-gray-700 text-white border-gray-600"
          />
          <Button type="submit" className="bg-red-900 hover:bg-red-800">Send</Button>
        </div>
      </form>
    </div>
  )
}
