import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin(){
  const [form, setForm] = useState({ username:'', password:'' })
  const [error, setError] = useState(null)
  const router = useRouter()

  const submit = async (e)=>{
    e.preventDefault()
    const res = await fetch('/api/login', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(form) })
    if(res.ok) router.push('/admin')
    else setError('Invalid credentials')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold">Admin Login</h3>
        <form className="mt-4 space-y-3" onSubmit={submit}>
          <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="username" className="w-full p-2 border rounded" />
          <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="password" className="w-full p-2 border rounded" />
          {/* Dev credentials removed from UI for security */}
          <div className="flex items-center justify-between">
            <button className="bg-safar-forest text-white px-4 py-2 rounded">Login</button>
            {error && <span className="text-red-600">{error}</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
