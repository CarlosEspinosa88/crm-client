import React from "react"
import Layout from '@/components/Layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function Pedidos() {
  return (
    <div>
      <Layout>
        <p className='text-slate-700'>Hola desde Pedidos</p>
      </Layout>
    </div>
  )
}

export default Pedidos