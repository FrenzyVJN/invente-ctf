import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { teamName } = req.body;

    // Define the correct time
    const correctName = localStorage.getItem('teamName');

    // Check if the submitted time matches the correct time
    if (teamName === correctName) {
      return res.status(200).json({ success: true, message: "Go to this link. Everything you’re trying to protect is there. What happens next is entirely up to you."});
    } else {
      return res.status(400).json({ success: false, message: 'Invalid Name' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
