import React from "react";
import Link from "next/link";
import { Inter } from 'next/font/google'
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

function Sidebar() {
  const route = useRouter()
  console.log(route.pathname)

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <p className='text-slate-500 text-2xl'>CRM Clientes</p>
      <nav className="mt-5 list-none">
        <li className={`${route.pathname === "/" ? 'bg-gray-600 mb-2': 'mb-2'}`}>
          <Link href="/">
            Clientes
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/pedidos">
            Pedidos
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/productos">
            Productos
          </Link>
        </li>
      </nav>
    </aside>
  )
}

export default Sidebar