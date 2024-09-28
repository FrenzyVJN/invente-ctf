'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

export default function ChallengePage1() {
  const [finalPassword, setFinalPassword] = useState("")
  const router = useRouter()

  const challenges = [
    { title: "The Paranoid Cryptographer", content: "During his last days, Victor's frantically attempted to leave a digital trail about his suspicions inside the hidden intricacies of the world of Hypertext Markup Languages." },
    { title: "The Cryptic Image", content: "I can no longer trust my inner circle. Too many files have been corrupted. Too many logs wiped clean. I've traced anomalies back to someone who should never have had access... someone close to me. " },
    { title: "The Hasty Clue", content: " \"They’re closing in. The truth is closer than you think.\"    This message confirms Victor was running out of time and knew he wouldn’t survive the conspiracy surrounding him. "},
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/challenge1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ finalPassword }),
      })

      const result = await response.json()
      if (response.ok && result.correct) {
        alert("Congratulations! You've solved the mystery.")
        router.push('/challenge2') // Redirect to challenge 2
      } else {
        alert("Incorrect password. Keep investigating!")
      }
    } catch (error) {
      console.error("Error submitting password:", error)
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
        <p className="hidden" id = "Hint 👀">Clue1: Victor knew he was being watched. I have little time left. They've been inside my systems. The more I uncover, the more danger I'm in. If you're reading this, you've found the first piece. They thought they could erase everything, but I've hidden the truth where they'd never think to look. This goes deeper than you know.
          <br />
          Clue2: Look at the next challenge, try reading through the image
          <br />
          Let the organisers know that you have found this clue!
        </p>
        {challenges.map((challenge, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full h-32 text-lg bg-slate-800 border-red-800 hover:bg-opacity-20 hover:bg-inherit hover:text-blue-200">
                {challenge.title}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-red-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-red-600">{challenge.title}</DialogTitle>
              </DialogHeader>
              <p>{challenge.content}</p>
              {challenge.title === "The Cryptic Image" && (<img src="/image.png" alt="Cryptic Image" />)}
              {challenge.title === "The Hasty Clue" && (<a href="/random.c" download="test.c" className="text-blue-400 underline"> Clue File</a>)}
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
