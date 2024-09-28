"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Skull } from 'lucide-react'

export default function LoginPage() {
  const [teamName, setTeamName] = useState('')
  const [member1, setMember1] = useState('')
  const [member2, setMember2] = useState('')
  const [member3, setMember3] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Team registration attempt:', { teamName, member1, member2, member3 })
    localStorage.setItem('teamName', teamName)
    
    // Post the data to the backend API
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName, member1, member2, member3 }),
      })

      if (response.ok) {
        console.log("Team registered successfully")
        router.push('/primary')
      } else {
        console.log("Team registered failed but still redirecting")
        router.push('/primary')
      }
    } catch (error) {
      // console.error('Error registering team:', error)
      // alert("An error occurred. Please try again later.")
      
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 justify-center flex items-center text-white p-8 font-mono" style={{
      backgroundImage: "url('/placeholder.jpg?height=1080&width=1920')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'difference',
    }}>
    
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 border-red-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-red-500">
            <Skull className="w-10 h-10 mx-auto mb-2" />
            Register Your Team
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Provide your team details to begin the investigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="teamName" className="text-gray-300">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="Your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="member1" className="text-gray-300">Member 1</Label>
                <Input
                  id="member1"
                  placeholder="Enter Member 1 name"
                  value={member1}
                  onChange={(e) => setMember1(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="member2" className="text-gray-300">Member 2</Label>
                <Input
                  id="member2"
                  placeholder="Enter Member 2 name"
                  value={member2}
                  onChange={(e) => setMember2(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="member3" className="text-gray-300">Member 3</Label>
                <Input
                  id="member3"
                  placeholder="Enter Member 3 name"
                  value={member3}
                  onChange={(e) => setMember3(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-red-900 hover:bg-red-800 text-white"
            onClick={handleSubmit}
          >
            Register Team
          </Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}