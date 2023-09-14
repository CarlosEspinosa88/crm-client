import * as Yup from 'yup';

import React from 'react'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'
import { withFormik, Form } from 'formik';

const schemaValidation = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  apellido: Yup.string().required('El apellido es requerido'),
  email: Yup.string().email('El email no es valido').required('El email es requerido'),
  empresa: Yup.string().required('La empresa es requerido'),
  password: Yup.string().required('El password es requerido').min(6, 'El password debe ser de 6 caracteres'),
})

function UpdateForm(props) {
  const router = useRouter();
  async function actualizarInfoCliente(event) {
    event.preventDefault();
    
    try {
      const { data } = await props?.actualizarCliente({ variables: {
        id: props?.cliente?.id,
        input: {
          nombre: props?.values?.nombre,
          apellido: props?.values?.apellido,
          email: props?.values?.email,
          empresa: props?.values?.empresa,
          telefono: props?.values?.telefono
        }
      }})

      Swal.fire(
        'Actualizado!',
        'El cliente se actualizó correctamente',
        'success'
      );

      router.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form
      onSubmit={actualizarInfoCliente}
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
          value={props?.values?.nombre}
          onChange={props?.handleChange}
          onBlur={props?.handleBlur}
          placeholder="Nombre Cliente"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        />
      </div>

      {props?.touched?.nombre && props?.errors?.nombre ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
          <p className="font-bold">Error</p>
          <p>{props?.errors?.nombre}</p>
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
          value={props?.values?.apellido}
          onChange={props?.handleChange}
          onBlur={props?.handleBlur}
          placeholder="Apellido Cliente"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        />
      </div>

      {props?.touched?.apellido && props?.errors?.apellido ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
          <p className="font-bold">Error</p>
          <p>{props?.errors?.apellido}</p>
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
          value={props?.values?.empresa}
          onChange={props?.handleChange}
          onBlur={props?.handleBlur}
          placeholder="Empresa Cliente"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        />
      </div>

      {props?.touched?.empresa && props?.errors?.empresa ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
          <p className="font-bold">Error</p>
          <p>{props?.errors?.empresa}</p>
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
          value={props?.values?.email}
          onChange={props?.handleChange}
          onBlur={props?.handleBlur}
          placeholder="Email Cliente"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        />
      </div>

      {props?.touched?.email && props?.errors?.email ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
          <p className="font-bold">Error</p>
          <p>{props?.errors?.email}</p>
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
          value={props?.values?.telefono}
          onChange={props?.handleChange}
          onBlur={props?.handleBlur}
          placeholder="Teléfono Cliente"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        />
      </div>
      <button
        type="submit"
        disabled={props.isSubmitting}
        className="block bg-slate-800 w-full mt-5 p-2 uppercase rounded hover:bg-slate-900"
      >
        Editar cliente
      </button>
    </Form>
  )
}

export const formikEnhancer = withFormik({
  mapPropsToValues: (props) => ({
    nombre: props.cliente.nombre,
    apellido: props.cliente.apellido,
    email: props.cliente.email, 
    empresa: props.cliente.empresa,
    telefono: props.cliente.telefono
  }),
  validationSchema: schemaValidation,
  displayName: 'UpdateForm',
})(UpdateForm);
