import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default function handler(req,res){
  const cookies = cookie.parse(req.headers.cookie || '')
  const token = cookies.token
  if(!token) return res.status(401).json({ error: 'Unauthorized' })
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'CHANGE_THIS_SECRET')
    return res.status(200).json({ user: decoded.user || 'admin' })
  }catch(e){
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
