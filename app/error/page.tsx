import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          filter: "grayscale(50%) brightness(30%)"
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-800 opacity-20 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-red-800 opacity-20 blur-xl animate-pulse" />
      </div>
      <div className="text-center space-y-6 p-8 bg-black bg-opacity-70 rounded-lg z-10 border border-red-800">
        <AlertTriangle className="w-16 h-16 mx-auto text-red-600 mb-4" />
        <h1 className="text-5xl font-extrabold text-red-600" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>Dead End</h1>
        <p className="text-xl">You've hit a wall in your investigation. The killer is still out there...</p>
        <Button asChild className="bg-red-800 hover:bg-red-900 text-white border border-red-600">
          <Link href="/challenge1">Return to the Scene</Link>
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-red-900 to-transparent opacity-50" />
    </div>
  )
} 