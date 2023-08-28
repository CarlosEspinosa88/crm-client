import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useMutation, gql } from '@apollo/client'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const AGREGAR_NUEVO_PRODUCTO = gql`
  mutation NuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
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

function NuevoProducto() {
  const router = useRouter()
  const [mensaje, guardarMensaje] = useState(null)
  const [ nuevoProducto ] = useMutation(AGREGAR_NUEVO_PRODUCTO, {
    update(cache, { data: nuevoProducto }) {
      
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS
      })

      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [
            ...obtenerProductos, nuevoProducto
          ]
        }
      })
    }
  })
  const formik = useFormik({
    initialValues: {
      nombre: '',
      existencia: '',
      precio: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre del cliente es obligatorio'),
      existencia: Yup.number()
        .required('La cantidad disponible es obligatorio')
        .positive('No se aceltan números negativos')
        .integer('Debe ser números enteros'),
      precio: Yup.number()
        .required('El precio es obligatorio')
        .positive('No se aceptan números negativos')
    }),
    onSubmit: async (valores) => {
      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre: valores.nombre,
              existencia: valores.existencia,
              precio: valores.precio
            }
          }
        })
        
        Swal.fire(
          'Creado!',
          'Se creó el prodcuto correctamente',
          'success'
        );

        router.push('/productos')
      } catch (error) {
        guardarMensaje(error.message.replace('GraphQL error: ', ''));

        setTimeout(() => {
          guardarMensaje(null)
        }, 3000)
      }
    }
  })

  function mensajeDeLaApi() {
    return (
      <div className="bg-white py-2 px-3 max-w-sm my-3 text-center mx-auto">
        <p className='text-gray-800 font-light'>{mensaje}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className='text-slate-700 text-2xl font-light'>Crear nuevo producto</h1>
      {mensaje ? mensajeDeLaApi() : null}
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-slate-800 text-sm font-bold mb-2"
              >
                Nombre
              </label>
              <input 
                id="nombre"
                type="text"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nombre Producto"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                htmlFor="existencia"
                className="block text-slate-800 text-sm font-bold mb-2"
              >
                Cantidad Disponible
              </label>
              <input 
                id="existencia"
                type="number"
                name="existencia"
                value={formik.values.existencia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Cantidad Disponible"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
            </div>

            {formik.touched.existencia && formik.errors.existencia ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.existencia}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                htmlFor="precio"
                className="block text-slate-800 text-sm font-bold mb-2"
              >
                Precio
              </label>
              <input 
                id="precio"
                type="number"
                name="precio"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Precio Producto"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
            </div>

            {formik.touched.precio && formik.errors.precio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}

            <input
              type="submit"
              value="Agregar nuevo producto"
              className="block bg-slate-800 w-full mt-5 p-2 uppercase rounded hover:bg-slate-900"
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NuevoProducto
