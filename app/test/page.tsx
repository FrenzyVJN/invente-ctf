"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Clock, FileText, BookOpen, LockKeyhole } from "lucide-react"

export default function ChallengePage1() {
  const [finalPassword, setFinalPassword] = useState("")

  const challenges = [
    {
      title: "The Broken Clock",
      content: "The grandfather clock in the study stopped at 11:17. What's significant about this time?",
      icon: Clock,
    },
    {
      title: "The Cryptic Note",
      content: "A crumpled note found in the victim's hand reads: '3-7-2-9'. What could it mean?",
      icon: FileText,
    },
    {
      title: "The Misplaced Book",
      content: "In the library, one book is out of place. Its call number is 'M364.1523'. What's the book about?",
      icon: BookOpen,
    },
    {
      title: "The Locked Safe",
      content: "There's a safe in the master bedroom. The combination is the sum of the victim's birth year digits. What year was the victim born?",
      icon: LockKeyhole,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your logic here to check if the final password is correct
    console.log("Submitted password:", finalPassword)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          filter: "grayscale(50%) brightness(30%)"
        }}
      />
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-red-600" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>The Manor's Secrets</h1>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {challenges.map((challenge, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full h-32 text-lg bg-gray-800 hover:bg-gray-700 border border-red-800 flex flex-col items-center justify-center">
                  <challenge.icon className="w-8 h-8 mb-2 text-red-600" />
                  {challenge.title}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white border border-red-800">
                <DialogHeader>
                  <DialogTitle className="text-red-600">{challenge.title}</DialogTitle>
                </DialogHeader>
                <p className="mt-4">{challenge.content}</p>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <Input
            type="password"
            placeholder="Enter the final password"
            value={finalPassword}
            onChange={(e) => setFinalPassword(e.target.value)}
            className="max-w-md bg-gray-800 border-red-800 text-white placeholder-gray-400"
          />
          <Button type="submit" className="bg-red-800 hover:bg-red-900 text-white border border-red-600">
            Solve the Mystery
          </Button>
        </form>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-red-900 to-transparent opacity-50" />
    </div>
  )
}