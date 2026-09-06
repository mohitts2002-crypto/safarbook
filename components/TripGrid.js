import TripCard from './TripCard'
import trips from '../data/trips'
import FilterBar from './FilterBar'

export default function TripGrid({ onOpen, query, category, setCategory }){
  const q = (query || '').trim().toLowerCase()

  const filtered = trips.filter(t=>{
    const matchesCategory = !category || category==='All' ? true : t.category === category
    const matchesQuery = !q ? true : (
      t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.highlights.join(' ').toLowerCase().includes(q)
    )
    return matchesCategory && matchesQuery
  })

  return (
    <section id="packages" className="container py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Destinations</h2>
        <p className="text-sm text-slate-600">Select a trip to view details</p>
      </div>

      <div className="mb-6">
        <FilterBar active={category} setActive={setCategory} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(t=> (
          <TripCard key={t.id} trip={t} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
