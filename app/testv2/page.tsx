'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function ChallengePage2() {
  const [answer, setAnswer] = useState("")
    useEffect(() => {
    const storedChallenge2 = localStorage.getItem("challenge2")
    if(storedChallenge2 !== "complete") {
      alert("You must complete the second challenge before proceeding.")
      window.open("/challenge2?user=vjn&pass=null", "_self")
    }
    }, [])

  const challenges = [
    { title: "The Poison Vial", content: "A small vial was found in the kitchen. What type of poison was used?" },
    { title: "The Torn Photograph", content: "A torn photograph shows part of a license plate. What are the visible numbers?" },
    { title: "The Muddy Footprints", content: "Muddy footprints lead to the garden. What's the shoe size of the killer?" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Submitted answer:", answer)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-mono" style={{
      backgroundImage: "url('/placeholder.jpg?height=1080&width=1920')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'difference',
    }}>
      <h1 className="text-4xl font-bold mb-8 text-center text-red-600">Hidden Clues</h1>
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
          placeholder="Enter your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="max-w-md bg-gray-800 border-red-800 text-white placeholder-gray-400"
        />
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Submit Evidence
        </Button>
      </form>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-red-900 to-transparent opacity-50" />
    </div>
  )
}