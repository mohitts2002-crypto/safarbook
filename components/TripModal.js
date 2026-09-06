import { useState, useEffect } from 'react'

export default function TripModal({ trip, onClose }){
  const [days, setDays] = useState(1)
  const [group, setGroup] = useState('Solo')
  const [vehicle, setVehicle] = useState('Sedan')

  useEffect(()=>{
    if(!trip) return
    // parse days from duration like '6 Days / 5 Nights'
    const match = (trip.duration || '').match(/(\d+)\s*Days?/i)
    const baseDays = match ? parseInt(match[1],10) : 2
    setDays(baseDays)
    setGroup('Solo')
    setVehicle('Sedan')
  },[trip])

  if(!trip) return null

  const phone = '918894480690'
  const buildMessage = ()=>{
    const msg = `Hi SafarBook, I want to book ${trip.title}. Duration: ${days}. Group: ${group}. Vehicle: ${vehicle}.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white sm:rounded-lg rounded-none sm:max-w-3xl w-full max-h-full sm:mx-4 overflow-auto sm:max-h-[90vh]">
        <div className="h-56 bg-cover bg-center rounded-t-lg" style={{backgroundImage:`url(${trip.imageUrl || trip.hero})`}} />
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold">{trip.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{trip.category} • {trip.duration} • {trip.budget}</p>
                <p className="text-sm text-slate-500 mt-1">Start Point: {trip.startPoint}</p>
            </div>
            <div className="text-right">
              <button onClick={onClose} className="mt-2 text-sm text-slate-500">Close</button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Detailed Itinerary</h4>
              <ol className="mt-2 list-decimal list-inside text-sm text-slate-700">
                {trip.itinerary.map((d, i)=> <li key={i} className="py-1">{d}</li>)}
              </ol>

              <h4 className="font-semibold mt-4">What's Included</h4>
              <ul className="mt-2 list-disc list-inside text-sm text-slate-700">
                {trip.includes.map((inc,i)=> <li key={i} className="py-1">{inc}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Customize Your Trip</h4>
              <div className="mt-3 space-y-3">
                <label className="block text-sm">Number of Days</label>
                  <select value={days} onChange={e=>setDays(parseInt(e.target.value,10))} className="w-full p-2 border rounded">
                  {(() => {
                    const match = (trip.duration || '').match(/(\d+)\s*Days?/i)
                    const base = match ? parseInt(match[1],10) : 2
                    return [base, base+1, base+2].map(n=> <option key={n} value={n}>{n} days</option>)
                  })()}
                </select>

                <label className="block text-sm">Group Size</label>
                <select value={group} onChange={e=>setGroup(e.target.value)} className="w-full p-2 border rounded">
                  <option>Solo</option>
                  <option>2-4</option>
                  <option>5-10</option>
                  <option>10+</option>
                </select>

                <label className="block text-sm">Preferred Transport</label>
                <select value={vehicle} onChange={e=>setVehicle(e.target.value)} className="w-full p-2 border rounded">
                  <option>Bike</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Tempo Traveller</option>
                </select>

                <BookingForm trip={trip} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BookingForm({ trip }){
  const [form, setForm] = useState({ fullName:'', phone:'', email:'', startDate:'', endDate:'', totalPeople:1, numGirls:0, numBoys:0 })
  const [status, setStatus] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    setStatus('loading')
    const payload = { destinationName: trip.title, ...form }
    const res = await fetch('/api/bookings', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload) })
    if(res.ok){ setStatus('success'); setTimeout(()=>setStatus(null),2000) }
    else setStatus('error')
  }

  return (
    <form onSubmit={submit} className="space-y-3">
        <label className="block text-sm">Full Name</label>
        <input required className="w-full p-2 border rounded" placeholder="e.g. Rahul Kumar" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} />

        <label className="block text-sm">Phone Number</label>
        <input required className="w-full p-2 border rounded" placeholder="e.g. +919888444869" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />

        <label className="block text-sm">Email (optional)</label>
        <input className="w-full p-2 border rounded" placeholder="example@mail.com" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm">Start Date</label>
            <input type="date" className="p-2 border rounded w-full" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm">End Date</label>
            <input type="date" className="p-2 border rounded w-full" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})} />
          </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm">Total People</label>
            <input type="number" min="1" className="p-2 border rounded w-full" value={form.totalPeople} onChange={e=>setForm({...form, totalPeople:parseInt(e.target.value||1,10)})} />
          </div>
          <div>
            <label className="block text-sm">Number of Girls</label>
            <input type="number" min="0" className="p-2 border rounded w-full" value={form.numGirls} onChange={e=>setForm({...form, numGirls:parseInt(e.target.value||0,10)})} />
          </div>
          <div>
            <label className="block text-sm">Number of Boys</label>
            <input type="number" min="0" className="p-2 border rounded w-full" value={form.numBoys} onChange={e=>setForm({...form, numBoys:parseInt(e.target.value||0,10)})} />
          </div>
      </div>
        <p className="text-xs text-slate-500">Tip: If you're unsure about exact dates, leave them blank and we'll contact you.</p>
      <div className="flex items-center gap-2">
        <button className="bg-safar-sunset text-white px-4 py-2 rounded">Send Booking</button>
        {status==='loading' && <span className="text-sm">Sending...</span>}
        {status==='success' && <span className="text-sm text-green-600">Booking submitted!</span>}
        {status==='error' && <span className="text-sm text-red-600">Error</span>}
      </div>
    </form>
  )
}
