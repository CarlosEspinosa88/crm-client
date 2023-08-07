import React from "react"
import Layout from '@/components/Layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function Productos() {
  return (
    <div>
      <Layout>
        <p className='text-slate-700'>Hola desde Productos</p>
      </Layout>
    </div>
  )
}

export default Productos