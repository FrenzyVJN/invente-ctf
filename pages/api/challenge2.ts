// pages/api/validatePassword.ts

import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {password} = req.body;

  // Mock password check, you should use a proper backend validation
  const storedPassword = "admin"; // You should fetch this from a secure database

  if (!password) {
    return res.status(400).json({ message: "Missing teamName or password." });
  }

  // Validate team and password
  if (password === storedPassword) {
    return res.status(200).json({ message: "Password valid", success: true });
  } else {
    return res.status(401).json({ message: "Invalid credentials", success: false });
  }
}
