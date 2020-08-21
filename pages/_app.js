import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Auth from '../utility/auth'

// import App from 'next/app'
import firebase from 'firebase/app'
import 'firebase/analytics'

// Initialize firebase app
import fireDb from '../utility/firebase'

// Only execute on client side
if (typeof window !== 'undefined') {
  // Initialize firebase analytics
  firebase.analytics();
}

function MyApp({ Component, pageProps }) {
    return (
      <Auth>
        <Component {...pageProps} />
      </Auth>
    )
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default MyApp