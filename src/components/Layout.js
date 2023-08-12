import React from "react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar"
import { useRouter } from "next/router";
import { Roboto } from 'next/font/google'

const roboto = Roboto({ 
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'], 
  display: 'swap',
})

function Layout({ children }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>CRM - Administracion de clientes</title>
      </Head>

      {router.pathname === "/login" ||  router.pathname === "/nueva-cuenta" ? (
          <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
              {children}
          </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className={`sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5 ${roboto.className}` } >
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default Layout;