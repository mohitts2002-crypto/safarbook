import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TripGrid from '../components/TripGrid'
import TripModal from '../components/TripModal'
import WhatsAppButton from '../components/WhatsAppButton'
import Footer from '../components/Footer'

export default function Home(){
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  return (
    <div>
      <Header />
      <main>
        <Hero query={query} setQuery={setQuery} />

        <TripGrid onOpen={(t)=>setSelected(t)} query={query} category={category} setCategory={setCategory} />

        <section id="how" className="container py-12">
          <h3 className="text-2xl font-bold">How It Works</h3>
          <ol className="mt-4 list-decimal list-inside text-slate-700">
            <li>Search your dream destination using the search bar or category filters.</li>
            <li>Open the trip to view detailed, day-by-day itinerary and inclusions.</li>
            <li>Customize number of days, group size and preferred vehicle.</li>
            <li>Click "Get Quote on WhatsApp" to send the pre-filled inquiry to us — we'll finalize permits, stays and transport.</li>
          </ol>
        </section>

        <section id="about" className="container py-12">
          <h3 className="text-2xl font-bold">Why SafarBook?</h3>
          <p className="mt-3 text-slate-700">We design safe, memorable Himalayan journeys with expert guides, comfortable transfers and handpicked stays. Fast responses and direct booking over WhatsApp.</p>
        </section>
      </main>

      <WhatsAppButton />

      {selected && <TripModal trip={selected} onClose={()=>setSelected(null)} />}
      <Footer />
    </div>
  )
}
