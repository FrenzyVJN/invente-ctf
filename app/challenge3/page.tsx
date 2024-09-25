"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    { id: 1, sender: 'Unknown', content: "Detective, I have information about the murder at Midnight Manor.", timestamp: '23:17' },
    { id: 2, sender: 'You', content: "Who is this? How did you get this number?", timestamp: '23:18' },
    { id: 3, sender: 'Unknown', content: "That's not important. What matters is the evidence hidden in the victim's study.", timestamp: '23:19' },
    { id: 4, sender: 'You', content: "What evidence? Where exactly?", timestamp: '23:20' },
    { id: 5, sender: 'Unknown', content: "Behind the painting of the old clock. But be careful, the time is the key.", timestamp: '23:21' },
  ]

  useEffect(() => {
    setMessages(initialMessages)
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

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

    // Check if the input message is the correct time
    if (inputMessage.trim() === '11:17') {
      setTimeout(() => {
        const responseMessage: Message = {
          id: messages.length + 2,
          sender: 'Unknown',
          content: "You've cracked the code. The evidence is at coordinates 51.5074° N, 0.1278° W",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        }
        setMessages(prevMessages => [...prevMessages, responseMessage])
        setShowClue(true)
      }, 1000)
    }
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
        {showClue && (
          <div className="text-center my-4">
            <p className="text-red-500 font-bold">Crucial evidence located. Proceed with caution.</p>
          </div>
        )}
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