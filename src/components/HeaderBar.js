import React from 'react';
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client';

const OBTENER_USUARIO = gql`
  query ObtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`

function HeaderBar() {
  const route = useRouter()
  const { data, loading, error } = useQuery(OBTENER_USUARIO)
  if (loading) {
    return (
      <div>
        <p className="text-gray-800 font-light" >Cargando....</p>
      </div>
    )
  }

  function cerrarSesion() {
    localStorage.removeItem('token')
    route.push('/login')
  }
  
  return (
    <div className="flex justify-between mb-6 ">
      <p className="text-slate-800 text-sm mr-2">Hola: {data?.obtenerUsuario?.nombre} {data?.obtenerUsuario?.apellido}</p>
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