import React from 'react'
import Head from 'next/head'
import  NavBar  from './NavBar'
import  Footer  from './Footer'

function Layout({children}) {
  return (
    <div className=" p-4">
      <Head>
        <title>Hachaton</title>
      </Head>
      <header>
        <NavBar/>
      </header>
      <main className=" w-full m-auto">
       {children}
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout
