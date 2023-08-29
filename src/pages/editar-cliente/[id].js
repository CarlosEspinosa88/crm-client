import React from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useQuery, gql, useMutation } from '@apollo/client';
import { useFormik, Formik, withFormik, Form } from 'formik';
import * as Yup from 'yup';
import { formikEnhancer as UpdateForm } from '@/components/UpdateForm';

const OBTENER_CLIENTE = gql`
  query ObtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      id
      nombre
      apellido
      email
      empresa
      vendedor
      telefono
    }
  }
`

const OBTENER_CLIENTES = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      email
      empresa
      vendedor
    }
  }
`

const ACTUALIZAR_CLIENTE = gql`
  mutation ActualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      id
      nombre
      apellido
      vendedor
    }
  }
`

export default function EditarCliente() {
  const router = useRouter();  
  const { data, loading, error } = useQuery(OBTENER_CLIENTE, { variables: { id: router?.query?.id } })
  const [ actualizarCliente ] = useMutation(ACTUALIZAR_CLIENTE, {
    update(cache, { data: clienteActualizado }) {
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES })

      cache.writeQuery({
        query: OBTENER_CLIENTES,
        data: {
          obtenerClientesVendedor: {
            ...obtenerClientesVendedor,
            clienteActualizado
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
      <h1 className='text-slate-700 text-2xl font-light'>Editar cliente</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <UpdateForm
            actualizarCliente={actualizarCliente}
            cliente={data.obtenerCliente}
          />
        </div>
      </div>
    </Layout>
  )
}
