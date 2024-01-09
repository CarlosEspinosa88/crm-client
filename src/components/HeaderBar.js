import React from 'react';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client';
import { OBTENER_USUARIO } from "@/config/queries"

function HeaderBar() {
  const route = useRouter()
  const { data, loading, error } = useQuery(OBTENER_USUARIO, { fetchPolicy: 'cache-and-network' })
  
  if (loading) {
    return (
      <div>
        <p className="text-gray-800 font-light" >Cargando....</p>
      </div>
    )
  }

  async function cerrarSesion() {
    await localStorage.removeItem('token')
    route.push('/login')
  }

  return (
    <div className="sm:flex sm:justify-between mb-6 ">
      <p className="text-slate-800 text-sm mr-2 mb-5 lg:mb-0">Hola: {data?.obtenerUsuario?.nombre} {data?.obtenerUsuario?.apellido}</p>
      <button
        onClick={cerrarSesion}
        type="button" 
        className="bg-slate-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-4 text-white shadow-md hover:bg-slate-900"
      >
        Cerrar sesión
      </button>
    </div>
  ) 
}

export default HeaderBar;
