import Link from 'next/link'
import { Phone, MessageCircle, Instagram, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-40 border-b border-slate-200">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-safar-forest to-safar-earth flex items-center justify-center text-white font-bold">SB</div>
          <div>
            <h1 className="text-lg font-semibold">SafarBook</h1>
            <p className="text-xs text-slate-600">Roads end. Stories begin.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-6 text-slate-700">
            <Link href="#packages">Packages</Link>
            <Link href="#categories">Categories</Link>
            <Link href="#about">About</Link>
          </nav>

          <a href="tel:+918894480690" className="hidden sm:inline-flex items-center gap-2 bg-safar-forest text-white px-3 py-2 rounded-md text-sm">
            <Phone size={14} /> Call
          </a>
          <a href="https://wa.me/918894480690" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-2 bg-safar-sunset text-white px-3 py-2 rounded-md text-sm">
            <MessageCircle size={14} /> WhatsApp
          </a>

          <button aria-label="menu" onClick={()=>setOpen(!open)} className="inline-flex items-center justify-center p-2 rounded-md bg-white border md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 flex flex-col gap-3">
            <Link href="#packages" onClick={()=>setOpen(false)} className="block">Packages</Link>
            <Link href="#categories" onClick={()=>setOpen(false)} className="block">Categories</Link>
            <Link href="#about" onClick={()=>setOpen(false)} className="block">About</Link>
            <a href="https://wa.me/918894480690" target="_blank" rel="noreferrer" className="block bg-safar-sunset text-white px-3 py-2 rounded">WhatsApp</a>
            <a href="https://instagram.com/21mohitt" target="_blank" rel="noreferrer" className="block">@21mohitt</a>
            <a href="https://instagram.com/traveljunkie.exe" target="_blank" rel="noreferrer" className="block">@traveljunkie.exe</a>
          </div>
        </div>
      )}
    </header>
  )
}
