'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

export default function ChallengePage1() {
  const [finalPassword, setFinalPassword] = useState("")

  const challenges = [
    { title: "The Broken Clock", content: "The grandfather clock in the study stopped at 11:17. What's significant about this time?" },
    { title: "The Cryptic Note", content: "A crumpled note found in the victim's hand reads: '3-7-2-9'. What could it mean?" },
    { title: "The Misplaced Book", content: "In the library, one book is out of place. Its call number is 'M364.1523'. What's the book about?" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted password:", finalPassword)
    if(finalPassword === "admin") {
      alert("Congratulations! You've solved the mystery. Look for the killer somewhere idk add your story line or whatever.")
      window.open("/challenge2?user=vjn&pass=notnull", "_self")
      localStorage.setItem("challenge1", "complete")
    } else {
        alert("Incorrect password. Keep investigating!")
        window.open("/error", "_self")
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-mono" style={{
      backgroundImage: "url('/placeholder.jpg?height=1080&width=1920')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'difference',
    }}>
      <h1 className="text-4xl font-bold mb-8 text-center text-red-600">The Manor's Secrets</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {challenges.map((challenge, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild className="bg-slate-800 border-red-800 hover:bg-opacity-20 hover:bg-inherit hover:text-blue-200">
              <Button variant="outline" className="w-full h-32 text-lg">
                {challenge.title}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-red-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-red-600">{challenge.title}</DialogTitle>
              </DialogHeader>
              <p>{challenge.content}</p>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <Input
          type="text"
          placeholder="Enter the final password"
          value={finalPassword}
          onChange={(e) => setFinalPassword(e.target.value)}
          className="max-w-md"
        />
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Solve the Mystery
        </Button>
      </form>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-red-900 to-transparent opacity-50" />
    </div>
  )
}
