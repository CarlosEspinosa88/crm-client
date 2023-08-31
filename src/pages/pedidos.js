import React from "react"
import Layout from '@/components/Layout'
import Link from "next/link"

function Pedidos() {
  return (
    <div>
      <Layout>
        <h1 className='text-slate-700 text-2xl font-light'>Pedidos</h1>
        <Link href="/nuevo-pedido" className="bg-slate-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-slate-900 mb-3 uppercase">
          Nuevo Pedido
        </Link>
      </Layout>
    </div>
  )
}

export default Pedidos