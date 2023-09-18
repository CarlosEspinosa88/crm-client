import * as Yup from 'yup'

import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { NUEVO_CLIENTE } from '@/config/mutations'
import { OBTENER_CLIENTES } from '@/config/queries'

function NuevoCliente() {
  const [mensaje, guardarMensaje] = useState(null)
  const router = useRouter()
  const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, { 
    update(cache, { data: { nuevoCliente }}) {
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES})

      cache.writeQuery({
        query: OBTENER_CLIENTES,
        data: {
          obtenerClientesVendedor: [
            ...obtenerClientesVendedor,
            nuevoCliente
          ]
        }
      })

    }
  })

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre del cliente es obligatorio'),
      apellido: Yup.string().required('El apellido del cliente es obligatorio'),
      empresa: Yup.string().required('El campo empresa es obligatorio'),
      email: Yup.string().email('Email no válido').required('El email del cliente es obligatio'),
      telefono: Yup.string()
    }),
    onSubmit: async (valores) => {
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre: valores.nombre,
              apellido: valores.apellido,
              empresa: valores.empresa,
              email: valores.email,
              telefono: valores.telefono
            }
          }
        })

        console.log(data.nuevoCliente)
        router.push('/')
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
      <h1 className='text-slate-700 text-2xl font-light'>Crear nuevo cliente</h1>
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
                placeholder="Nombre Cliente"
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
                htmlFor="apellido"
                className="block text-slate-800 text-sm font-bold mb-2"
              >
                Apellido
              </label>
              <input 
                id="apellido"
                type="text"
                name="apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Apellido Cliente"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
            </div>

            {formik.touched.apellido && formik.errors.apellido ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.apellido}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                htmlFor="empresa"
                className="block text-slate-800 text-sm font-bold mb-2"
              >
                Empresa
              </label>
              <input 
                id="empresa"
                type="text"
                name="empresa"
                value={formik.values.empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Empresa Cliente"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
            </div>

            {formik.touched.empresa && formik.errors.empresa ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.empresa}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-slate-800 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input 
                id="email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email Cliente"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                htmlFor="telefono"
                className="block text-slate-800 text-sm font-bold mb-2"
              >
                Teléfono
              </label>
              <input 
                id="telefono"
                type="tel"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Teléfono Cliente"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
            </div>
            <input
              type="submit"
              value="Registrar cliente"
              className="block bg-slate-800 w-full mt-5 p-2 uppercase rounded hover:bg-slate-900"
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default  NuevoCliente
