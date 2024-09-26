"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Divide, Skull } from 'lucide-react'
import data from '@/app/data.json'
export default function LoginPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt:', { name, email })
    for(let i=0;i<data.users.length;i++){
        if (data.users[i].name === name && data.users[i].email === email){
            console.log("User found");
            localStorage.setItem('user', JSON.stringify(data.users[i]))
            localStorage.setItem('loggedIn', 'true')
            router.push('/challenge1')
            return;
        }
    }
    alert("User not found. Please check your credentials and try again.")
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
            Enter the Murder Mystery
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Provide your details to begin the investigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input
                  id="name"
                  placeholder="Detective's name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="detective@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
            Begin Investigation
          </Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}