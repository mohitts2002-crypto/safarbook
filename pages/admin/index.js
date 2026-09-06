import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Admin(){
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [queries, setQueries] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(()=>{
    fetch('/api/me').then(r=> r.ok ? r.json() : Promise.reject()).then(d=> setUser(d.user)).catch(()=> router.push('/admin/login'))
    fetch('/api/queries').then(r=> r.json()).then(d=> setQueries(d.data)).catch(()=>{})
    fetch('/api/bookings').then(r=> r.json()).then(d=> setBookings(d.data)).catch(()=>{})
  },[])

  if(!user) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-4">
        <h3 className="text-lg font-bold">Admin</h3>
        <nav className="mt-4 space-y-2">
          <a href="#queries" className="block">General Queries ({queries.length})</a>
          <a href="#bookings" className="block">Trip Bookings ({bookings.length})</a>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <section id="queries">
          <h4 className="text-xl font-semibold">General Queries</h4>
          <div className="mt-3 bg-white rounded shadow overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100"><tr><th className="p-2">Name</th><th>Phone</th><th>Email</th><th>Message</th><th>When</th></tr></thead>
              <tbody>
                {queries.map(q=> (
                  <tr key={q._id} className="border-t"><td className="p-2">{q.firstName} {q.lastName}</td><td>{q.phone}</td><td>{q.email}</td><td>{q.message}</td><td>{new Date(q.createdAt).toLocaleString()}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="bookings" className="mt-6">
          <h4 className="text-xl font-semibold">Trip Bookings</h4>
          <div className="mt-3 bg-white rounded shadow overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100"><tr><th className="p-2">Destination</th><th>Full Name</th><th>Phone</th><th>Dates</th><th>People (G/B)</th><th>When</th></tr></thead>
              <tbody>
                {bookings.map(b=> (
                  <tr key={b._id} className="border-t"><td className="p-2">{b.destinationName}</td><td>{b.fullName}</td><td>{b.phone}</td><td>{b.startDate ? new Date(b.startDate).toLocaleDateString() : '-'} - {b.endDate ? new Date(b.endDate).toLocaleDateString() : '-'}</td><td>{b.totalPeople} ({b.numGirls}/{b.numBoys})</td><td>{new Date(b.createdAt).toLocaleString()}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
