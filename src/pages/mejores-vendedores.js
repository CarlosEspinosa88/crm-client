import React, { useEffect } from 'react'
import Layout from '@/components/Layout';
import { useQuery } from '@apollo/client';
import { MEJORES_VENDEDORES } from '@/config/queries'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MejoresVendedores() {
  const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES)

  useEffect(() => {
    startPolling(2000)

    return () => {
      stopPolling()
    }

  }, [startPolling, stopPolling ])

  if (loading) {
    return (
      <Layout>
        <p className="text-gray-800 font-light">Cargando....</p>
      </Layout>
    )
  }

  let mejoresVendedores = [];
  
  data?.mejoresVendedores?.map((vendedor, index) => {
    mejoresVendedores[index] = {...vendedor.vendedor[0], total: vendedor.total}
  })

  return (
    <>
      {!loading && data ? (
        <Layout>
          <h1 className='text-slate-700 text-2xl font-light'>
            Mejores Vendedores
          </h1>
          <ResponsiveContainer width={'99%'} height={550}>
            <BarChart
              className="mt-10"
              width={500}
              height={300}
              data={mejoresVendedores}
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

export default MejoresVendedores
