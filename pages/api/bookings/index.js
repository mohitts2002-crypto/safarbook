import dbConnect from '../../../../lib/mongodb'
import Booking from '../../../../models/Booking'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function handler(req, res){
  await dbConnect()
  if(req.method === 'POST'){
    try{
      const { destinationName, fullName, phone, email, startDate, endDate, totalPeople, numGirls, numBoys } = req.body
      const b = await Booking.create({ destinationName, fullName, phone, email, startDate, endDate, totalPeople, numGirls, numBoys })
      return res.status(201).json({ success: true, data: b })
    }catch(err){
      return res.status(500).json({ success:false, error: err.message })
    }
  }

  // GET - protected
  if(req.method === 'GET'){
    try{
      const cookies = cookie.parse(req.headers.cookie || '')
      const token = cookies.token
      if(!token) return res.status(401).json({ error: 'Unauthorized' })
      jwt.verify(token, process.env.JWT_SECRET || 'CHANGE_THIS_SECRET')
      const items = await Booking.find().sort({ createdAt: -1 }).lean()
      return res.status(200).json({ success:true, data: items })
    }catch(err){
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
