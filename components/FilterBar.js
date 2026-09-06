export default function FilterBar({ active, setActive }){
  const categories = ["All","Road Trips","Weekend Getaways","Glacial Lakes","Crossover Passes"]
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(c=> (
        <button key={c} onClick={()=>setActive(c)} className={`px-3 py-2 rounded ${active===c? 'bg-safar-forest text-white':'bg-white border'}`}>
          {c}
        </button>
      ))}
    </div>
  )
}
