import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const AUTENTICAR_NUEVO_USUARIO = gql`
  mutation AutenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`

function Login() {
  const [mensaje, guardarMensaje] = useState(null)
  const router = useRouter()
  const [ autenticarUsuario ] = useMutation(AUTENTICAR_NUEVO_USUARIO)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es valido').required('El email no puede ir vacio'),
      password: Yup.string().required('El password es obligatorio'),
    }),
    onSubmit: async (valores) => {
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email: valores.email,
              password: valores.password
            }
          }
        })

        guardarMensaje('Autenticando Usuario...');
        const { token } = data.autenticarUsuario
        localStorage.setItem('token', token)

        
        setTimeout(() => {
          guardarMensaje(null)
          router.push('/')
        }, 3000)

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
        <p>{mensaje}</p>
      </div>
    )
  }

  return (
    <>
      <Layout>
          {mensaje ? mensajeDeLaApi() : null}
          <h1 className="text-center text-2xl font-light">
            Login
          </h1>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
              <form 
                onSubmit={formik.handleSubmit}
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              >
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
                    placeholder="Email usuario"
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
                    htmlFor="password"
                    className="block text-slate-800 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input 
                    id="password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password usuario"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
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
                  value="Iniciar sesion"
                  className="block bg-slate-800 w-full mt-5 p-2 uppercase rounded hover:bg-slate-900"
                />
              </form>
            </div>
          </div>
      </Layout>
    </>
  )
  
}

export default Login