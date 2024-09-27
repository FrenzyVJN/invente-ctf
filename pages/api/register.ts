import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { teamName, member1, member2 , member3 } = req.body

      // Check if teamName and member1 are provided
      if (!teamName || !member1) {
        return res.status(400).json({ message: 'Team name and Member 1 are required.' })
      }

      const filePath = path.resolve(process.cwd(), 'data.json')
      const fileData = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(fileData) // Parse JSON data from the file

      // Add new team data
      data.teams.push({ teamName, member1, member2, member3 })

      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

      return res.status(200).json({ message: 'Team added successfully!' })
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({ message: 'Server error' })
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}