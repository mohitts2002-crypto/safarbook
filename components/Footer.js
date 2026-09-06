export default function Footer(){
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-semibold">SafarBook</div>
          <div className="text-sm text-slate-600">Roads end. Stories begin.</div>
        </div>
        <div className="flex gap-4">
          <a href="https://instagram.com/21mohitt" target="_blank" rel="noreferrer">@21mohitt</a>
          <a href="https://instagram.com/traveljunkie.exe" target="_blank" rel="noreferrer">@traveljunkie.exe</a>
          <a href="/admin/login" className="ml-4 text-sm text-slate-700">Admin Login</a>
        </div>
      </div>
    </footer>
  )
}
