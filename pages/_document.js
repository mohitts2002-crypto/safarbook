import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(){
    const safeScript = `
    try{
      // remove any injected rule that hides body
      var styles = document.querySelectorAll('style');
      styles.forEach(function(s){
        try{ if((s.innerText||'').indexOf('body{display:none')!==-1) s.parentNode && s.parentNode.removeChild(s) }catch(e){}
      });
      if(window && document && document.body && getComputedStyle(document.body).display==='none') document.body.style.display='block'
    }catch(e){}
    `

    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: safeScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
