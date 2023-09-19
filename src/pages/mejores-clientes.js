import React from 'react'
import Layout from '@/components/Layout';
import { useQuery } from '@apollo/client';
import { MEJORES_CLIENTES } from "@/config/queries"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MejoresClientes() {
  const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES)

  if (loading) {
    return (
      <Layout>
        <p className="text-gray-800 font-light">Cargando....</p>
      </Layout>
    )
  }

  let mejoresClientes = [];
  
  data?.mejoresClientes?.map((cliente, index) => {
    mejoresClientes[index] = {...cliente.cliente[0], total: cliente.total}
  })

  return (
    <>
      {!loading && data ? (
        <Layout>
          <h1 className='text-slate-700 text-2xl font-light'>
            Mejores Clientes
          </h1>
          <ResponsiveContainer width={'99%'} height={550}>
            <BarChart
              className="mt-10"
              width={500}
              height={300}
              data={mejoresClientes}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3a5d89" />
            </BarChart>
          </ResponsiveContainer>
        </Layout>     
      ) : null}
    </>
  )
}

export default MejoresClientes
