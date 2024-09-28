import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { finalPassword } = req.body
    const correctPassword = "5556325597"

    if (finalPassword === correctPassword) {
      res.status(200).json({ correct: true })
    } else {
      res.status(200).json({ correct: false })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}