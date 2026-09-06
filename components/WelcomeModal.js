import { useState } from 'react'

export default function WelcomeModal({ onClose }){
  const [form, setForm] = useState({ firstName:'', lastName:'', phone:'', email:'', message:'' })
  const [status, setStatus] = useState(null)

  const handle = async (e)=>{
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/queries', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(form) })
    if(res.ok){ setStatus('success'); localStorage.setItem('safarbook_seen','1'); setTimeout(()=>onClose(),1000) }
    else setStatus('error')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg max-w-lg w-full p-6 mx-4">
        <h3 className="text-xl font-bold">Welcome to SafarBook</h3>
        <p className="text-sm text-slate-600">Quickly tell us who you are — we'll get back via WhatsApp.</p>
        <form className="mt-4 space-y-2" onSubmit={handle}>
          <div className="flex gap-2">
            <input required value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} placeholder="First Name" className="flex-1 p-2 border rounded" />
            <input value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} placeholder="Last Name" className="flex-1 p-2 border rounded" />
          </div>
          <input required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone Number" className="w-full p-2 border rounded" />
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
          <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Your query" className="w-full p-2 border rounded" />
          <div className="flex items-center justify-between">
            <button className="bg-safar-forest text-white px-4 py-2 rounded">Send</button>
            {status==='loading' && <span className="text-sm">Sending...</span>}
            {status==='success' && <span className="text-sm text-green-600">Thanks — we'll contact you!</span>}
            {status==='error' && <span className="text-sm text-red-600">Error sending</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
