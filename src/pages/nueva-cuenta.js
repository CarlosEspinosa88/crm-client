import React from 'react';
import Layout from '@/components/Layout';

function NuevaCuenta() {
  return (
    <>
      <Layout>
      <h1 className="text-center text-2xl font-light">
            Crear nueva cuenta
          </h1>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
              <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
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
                    placeholder="Nombre usuario"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  />
                </div>
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
                    placeholder="Apellido usuario"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  />
                </div>
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
                    placeholder="Email usuario"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  />
                </div>
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
                    placeholder="Password usuario"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  />
                </div>
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