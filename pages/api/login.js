import jwt from 'jsonwebtoken'

export default function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { username, password } = req.body
  // Development credentials set as requested: safarbook / 0921
  if(username === 'safarbook' && password === '0921'){
    const token = jwt.sign({ user: 'safarbook' }, process.env.JWT_SECRET || 'CHANGE_THIS_SECRET', { expiresIn: '4h' })
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=14400`) // 4 hours
    return res.status(200).json({ success:true })
  }
  return res.status(401).json({ error: 'Invalid credentials' })
}
