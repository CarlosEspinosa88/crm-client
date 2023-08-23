import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import * as Yup from 'yup';

const NUEVA_CUENTA = gql`
  mutation NuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      nombre
      apellido
      email
      creado
    }
  }
`

function NuevaCuenta() {
  const [ mensaje, guardarMensaje ] = useState(null)
  const router = useRouter()
  const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA)
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es requerido'),
      apellido: Yup.string().required('El apellido es requerido'),
      email: Yup.string().email('El email no es valido').required('El email es requerido'),
      password: Yup.string().required('El password es requerido').min(6, 'El password debe ser de 6 caracteres'),
    }),
    onSubmit: async (valores) => {
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre: valores.nombre,
              apellido: valores.apellido,
              email: valores.email,
              password: valores.password
            }
          }
        })

        guardarMensaje(`Creando usuario ${data.nuevoUsuario.nombre}`);
        
        setTimeout(() => {
          guardarMensaje(null);
          router.push('/login')
        }, 3000)

      } catch (error) {
        guardarMensaje(error.message.replace('GraphQL error: ', ''));

        setTimeout(() => {
          guardarMensaje(null);
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
    <>
      <Layout>
          {mensaje ? mensajeDeLaApi() : null}
          <h1 className="text-center text-2xl font-light">
            Crear nueva cuenta
          </h1>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
              <form 
                onSubmit={formik.handleSubmit}
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="nombre"
                    placeholder="Nombre usuario"
                    className={`
                      shadow 
                      appearance-none
                      border
                      rounded
                      w-full
                      py-2
                      px-3 
                      text-slate-700 
                      leading-tight 
                      focus:outline-none 
                      ${formik.touched.nombre && formik.errors.nombre
                        ? "focus:border-red-500 focus:ring-red-500" 
                        : "focus:border-sky-500 focus:ring-sky-500"
                      } 
                      focus:ring-1`
                    }
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
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="apellido"
                    placeholder="Apellido usuario"
                    className={`
                      shadow 
                      appearance-none
                      border
                      rounded
                      w-full
                      py-2
                      px-3 
                      text-slate-700 
                      leading-tight 
                      focus:outline-none 
                      ${formik.touched.apellido && formik.errors.apellido
                        ? "focus:border-red-500 focus:ring-red-500" 
                        : "focus:border-sky-500 focus:ring-sky-500"
                      } 
                      focus:ring-1`
                    }
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
                    htmlFor="email"
                    className="block text-slate-800 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input 
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    name="email"
                    placeholder="Email usuario"
                    className={`
                      shadow 
                      appearance-none
                      border
                      rounded
                      w-full
                      py-2
                      px-3 
                      text-slate-700 
                      leading-tight 
                      focus:outline-none 
                      ${formik.touched.email && formik.errors.email
                        ? "focus:border-red-500 focus:ring-red-500" 
                        : "focus:border-sky-500 focus:ring-sky-500"
                      }
                      focus:ring-1`
                    }
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
                    htmlFor="password"
                    className="block text-slate-800 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input 
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    name="password"
                    placeholder="Password usuario"
                    className={`
                      shadow 
                      appearance-none
                      border
                      rounded
                      w-full
                      py-2
                      px-3 
                      text-slate-700 
                      leading-tight 
                      focus:outline-none 
                      ${formik.touched.password && formik.errors.password 
                        ? "focus:border-red-500 focus:ring-red-500" 
                        : "focus:border-sky-500 focus:ring-sky-500"
                      } 
                      focus:ring-1`
                    }
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
                <input
                  type="submit"
                  value="Crear cuenta"
                  className="block bg-slate-800 w-full mt-5 p-2 uppercase rounded hover:bg-slate-900"
                />
              </form>
            </div>
          </div>
      </Layout>
    </>
  )
}

export default NuevaCuenta