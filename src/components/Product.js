import React from 'react'
import Swal from 'sweetalert2';
import { useMutation, gql } from "@apollo/client"

const ELIMINAR_PRODUCTO = gql`
  mutation EliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`

const OBTENER_PRODUCTOS = gql`
  query ObtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
      creado
    }
  }
`


export default function Product({ producto }) {
  const { id, nombre, existencia, precio } = producto;
  const [ eliminarProducto ] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })
      
      cache.writeQuery({ 
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id)
        }
      })
    }
  })


  function confirmarEliminarProducto() {
    Swal.fire({
      title: 'Deseas eliminar este proeducto?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarProducto({
            variables: { id }
          })

          Swal.fire(
            'Correcto!',
            data.eliminarProducto,
            'success'
          )
        } catch (error) { 
          console.log(error)
        }
      }
    })
  }

  return (
    <tr>
      <td className='border px-4 py-2 text-gray-800'>
        {nombre}
      </td>
        <td className='border px-4 py-2 text-gray-800'>
        {existencia}
      </td>
      <td className='border px-4 py-2 text-gray-800'>
        $ {precio}
      </td>
      <td className='border px-4 py-2 text-gray-800'>
        <button
          type="button"
          className="flex justify-center items-center bg-red-500 px-4 py-2 w-full text-white rounded text-xs font-bold"
          onClick={confirmarEliminarProducto}
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
          // onClick={editarCliente}
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
