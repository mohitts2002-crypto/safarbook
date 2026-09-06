import Image from 'next/image'

export default function TripCard({ trip, onOpen }){
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="w-full h-40 sm:h-44 md:h-48 relative">
        <img src={trip.imageUrl || trip.hero} alt={trip.title} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base md:text-lg">{trip.title}</h3>
        <p className="text-sm text-slate-600 mt-1">{trip.highlights?.slice(0,2).join(', ')}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-slate-700">{trip.budget}</div>
          <button onClick={()=>onOpen(trip)} className="text-sm bg-safar-sunset text-white px-3 py-1 rounded">View</button>
        </div>
      </div>
    </div>
  )
}
