import dbConnect from '../../../../lib/mongodb'
import Query from '../../../../models/Query'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function handler(req, res){
  await dbConnect()
  if(req.method === 'POST'){
    try{
      const { firstName, lastName, phone, email, message } = req.body
      const q = await Query.create({ firstName, lastName, phone, email, message })
      return res.status(201).json({ success: true, data: q })
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
      const items = await Query.find().sort({ createdAt: -1 }).lean()
      return res.status(200).json({ success:true, data: items })
    }catch(err){
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
