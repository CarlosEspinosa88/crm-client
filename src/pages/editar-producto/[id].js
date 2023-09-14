import React from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client';
import { ACTUALIZAR_PRODUCTO } from '@/config/mutations'
import { OBTENER_PRODUCTOS, OBTENER_PRODUCTO } from '@/config/queries'
import { formikEnhancer as UpdateProductForm } from '@/components/UpdateProductForm';

function EditarProducto() {
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

export default EditarProducto
