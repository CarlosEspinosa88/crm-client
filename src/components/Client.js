import React from 'react'
import Swal from 'sweetalert2';
import { useMutation } from "@apollo/client"
import { OBTENER_CLIENTES } from "@/config/queries"
import { REMOVER_CLIENTE } from "@/config/mutations"
import { useRouter } from 'next/router'

function Client({ cliente }) {
  const router = useRouter()
  const { id, nombre, apellido, empresa, email } = cliente;
  const [ eliminarCliente ] = useMutation(REMOVER_CLIENTE, {
    update(cache) {
      const { obtenerClientesVendedor } = cache.readQuery({ query:  OBTENER_CLIENTES });

      cache.writeQuery({ 
        query: OBTENER_CLIENTES,
        data: { 
          obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id)
        }
      })
    }
  })

  function confirmarEliminarCliente() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarCliente({
            variables: { id }
          })

          Swal.fire(
            'Deleted!',
            data.eliminarCliente,
            'success'
          )
        } catch (error) { 
          console.log(error)
        }
      }
    })
  }

  function editarCliente() {
    router.push({
      pathname: "/editar-cliente/[id]",
      query: { id }
    })
  }

  return (
    <tr>
      <td className='border px-4 py-2 text-gray-800'>
        {nombre} {apellido}
      </td>
        <td className='border px-4 py-2 text-gray-800'>
        {empresa}
      </td>
      <td className='border px-4 py-2 text-gray-800'>
        {email}
      </td>
      <td className='border px-4 py-2 text-gray-800'>
        <button
          type="button"
          className="flex justify-center items-center bg-red-500 px-4 py-2 w-full text-white rounded text-xs font-bold"
          onClick={confirmarEliminarCliente}
        >
          Eliminar
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </td>
      <td className='border px-4 py-2 text-gray-800'>
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 px-4 py-2 w-full text-white rounded text-xs font-bold"
          onClick={editarCliente}
        >
          Editar
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default Client
