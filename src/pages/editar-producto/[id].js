import React from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useQuery, gql, useMutation } from '@apollo/client';
import { formikEnhancer as UpdateProductForm } from '@/components/UpdateProductForm';

const OBTENER_PRODUCTO = gql`
  query ObtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      precio
      existencia
      creado
    }
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

const ACTUALIZAR_PRODUCTO = gql`
  mutation ActualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      nombre
      precio
      existencia
      creado
    }
  }
`

export default function EditarProducto() {
  const router = useRouter();
  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: { id: router?.query?.id }
  })

  const [ actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO, {
    update(cache, { data: { productoEditado }}) {
      const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS})

      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: {
            ...obtenerProductos,
            productoEditado
          }          
        }
      })
    }
  })
  
  if (loading) {
    return (
      <Layout>
        <p className="text-gray-800 font-light" >Cargando....</p>
      </Layout>
    )
  }
  

  return (
    <Layout>
      <h1 className='text-slate-700 text-2xl font-light'>Editar producto</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <UpdateProductForm
            actualizarProducto={actualizarProducto}
            cliente={data.obtenerProducto}
          />
        </div>
      </div>
    </Layout>
  )
}
