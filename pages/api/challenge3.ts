import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { time } = req.body;

    // Define the correct time
    const correctTime = '11:17';

    // Check if the submitted time matches the correct time
    if (time === correctTime) {
      return res.status(200).json({ success: true, message: "You've cracked the code. The evidence is at coordinates 51.5074° N, 0.1278° W" });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid time' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
