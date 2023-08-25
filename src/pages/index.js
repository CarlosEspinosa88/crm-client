import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Client from '@/components/Client'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'


const OBTENER_CLIENTES = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      email
      empresa
      vendedor
    }
  }
`

export default function Home() {
  const router = useRouter()
  const { data, loading, error } = useQuery(OBTENER_CLIENTES)

  if (loading) {
    return (
      <Layout>
        <p className="text-gray-800 font-light">Cargando....</p>
      </Layout>
    )
  }

  if (!data?.obtenerClientesVendedor) {
    router.push('/login')
  }

  return (
    <div>
      {!loading && data ? (
        <Layout>
          <>
            <h1 className='text-slate-700 text-2xl font-light'>Clientes</h1>
            <Link href="/nuevo-cliente" className="bg-slate-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-slate-900 mb-3 uppercase" >
              Nuevo cliente
            </Link>
            <table className='table-auto shadow-md mt-10 w-full w-lg'>
              <thead className='bg-slate-800'>
                <tr className=' text-white'>
                  <th className='w-1/5 py-2'>Nombre</th>
                  <th className='w-1/5 py-2'>Empresa</th>
                  <th className='w-1/5 py-2'>Email</th>
                  <th className='w-1/5 py-2'>Eliminar</th>
                  <th className='w-1/5 py-2'>Editar</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {data?.obtenerClientesVendedor?.map(cliente => (
                  <Client key={cliente.id} cliente={cliente} />
                ))}
              </tbody>
            </table>
          </>
        </Layout>
      ) : null}
  </div>
  )
}
