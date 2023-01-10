import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.js');
   },[])


  return(
    <Layout>
      <Component {...pageProps} />      
    </Layout>
  ) 
}
