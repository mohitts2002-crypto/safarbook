import '../styles/globals.css'
import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import WelcomeModal from '../components/WelcomeModal'

export default function MyApp({ Component, pageProps }){
  const [showWelcome, setShowWelcome] = useState(false)
  useEffect(()=>{
    const seen = localStorage.getItem('safarbook_seen')
    if(!seen) setShowWelcome(true)
  },[])

  // Fix: remove any stray style tag injected that hides the body (prevents white screen)
  useEffect(()=>{
    try{
      const styles = Array.from(document.querySelectorAll('style'))
      styles.forEach(s=>{
        const t = (s.innerText||"").trim()
        if(t === 'body{display:none}' || t.includes('body{display:none')) s.remove()
      })
      if(getComputedStyle(document.body).display === 'none') document.body.style.display = 'block'
    }catch(e){/* ignore in non-browser environments */}
  },[])

  return (
    <Fragment>
      <Component {...pageProps} />
      {showWelcome && <WelcomeModal onClose={()=>setShowWelcome(false)} />}
    </Fragment>
  )
}
