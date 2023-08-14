import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter()

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <p className='text-slate-500 text-2xl'>CRM Clientes</p>
      <nav className="mt-5 list-none">
        <li className={`${router.pathname === "/" ? 'bg-gray-700 mb-2 p-2': 'p-2 mb-2'}`}>
          <Link href="/" className="block" >
            Clientes
          </Link>
        </li>
        <li className={`${router.pathname === "/pedidos" ? 'bg-gray-700 mb-2 p-2': 'p-2 mb-2'}`}>
          <Link href="/pedidos" className="block" >
            Pedidos
          </Link>
        </li>
        <li className={`${router.pathname === "/productos" ? 'bg-gray-700 mb-2 p-2': 'p-2 mb-2'}`}>
          <Link href="/productos" className="block">
            Productos
          </Link>
        </li>
      </nav>
    </aside>
  )
}

export default Sidebar