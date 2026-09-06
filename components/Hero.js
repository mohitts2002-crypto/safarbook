import { useState } from 'react'

export default function Hero({ query, setQuery }){
  const [local, setLocal] = useState(query || '')

  const onSubmit = (e)=>{
    e.preventDefault()
    setQuery(local)
  }

  // update parent query as the user types for dynamic filtering
  const onChange = (v)=>{
    setLocal(v)
    setQuery(v)
  }

  return (
    <section className="relative h-[56vh] sm:h-[64vh] md:h-[72vh] flex items-center" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=1b3f8a0a3b6f9d0d1d1a7c8e6a0b5b8b')`, backgroundSize:'cover', backgroundPosition:'center'}}>
      <div className="container text-white z-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow">Roads end. Stories begin.</h2>
        <p className="mt-2 text-sm sm:text-lg md:text-xl max-w-xl drop-shadow">Plan your Himalayan story — search destinations or pick a category.</p>

        <form onSubmit={onSubmit} className="mt-6 max-w-2xl bg-white/90 text-slate-900 rounded-md p-3 flex gap-2 items-center flex-col sm:flex-row">
          <input aria-label="Search destination" value={local} onChange={e=>onChange(e.target.value)} placeholder="Search by name or category e.g., Hampta, Triund, Weekend Getaways" className="flex-1 bg-transparent outline-none px-3 py-2 w-full" />
          <button type="submit" className="bg-safar-forest text-white px-4 py-2 rounded-md w-full sm:w-auto">Search</button>
        </form>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
    </section>
  )
}
