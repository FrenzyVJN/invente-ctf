import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/placeholder.jpg?height=1080&width=1920')",
          filter: "grayscale(50%) brightness(100%)"
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-800 opacity-20 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-red-800 opacity-20 blur-xl animate-pulse" />
      </div>
      <div className=" space-y-6 p-8 bg-black bg-opacity-70 rounded-lg z-10 border w-1/2 h-2/3 border-red-800">
        <h1 className="text-5xl text-center font-extrabold text-red-600" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>Cryptic Cadavers</h1>
        <p className="text-xl h-3/4 text-center ">Victor Blackwood, a world-renowned cryptographer and tech mogul,<br /> was found dead in his mansion under suspicious circumstances.<br /><br /> Known for his groundbreaking work in encryption and cybersecurity,<br /> Victor had many admirers, but also many enemies. <br /><br /> In the weeks leading up to his death, Victor had grown increasingly paranoid, <br />convinced that someone close to him was plotting against him.<br /><br />  His personal files and communications have been locked behind complex encryption schemes,<br /> with hidden clues scattered throughout his digital footprint.<br /><br /> As the investigator, it is your job to navigate this web of cryptic messages,<br /> uncover the truth behind Victor’s demise, and expose the identity of the killer lurking in the shadows.</p>
        <Button asChild className="bg-red-800 mx-auto text-lg flex w-1/3 hover:bg-red-900 text-white border border-red-600">
          <Link href="/register">Start the Hunt</Link>
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-red-900 to-transparent opacity-50" />
    </div>
  )
}