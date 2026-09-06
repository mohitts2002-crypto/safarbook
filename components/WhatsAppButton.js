import { MessageSquare } from 'lucide-react'

export default function WhatsAppButton(){
  return (
    <a href="https://wa.me/918894480690" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed right-4 bottom-4 z-50 bg-safar-sunset text-white p-4 rounded-full shadow-lg flex items-center justify-center sm:p-4 md:p-5">
      <MessageSquare size={20} />
    </a>
  )
}
