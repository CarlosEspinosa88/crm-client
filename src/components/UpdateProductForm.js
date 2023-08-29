import React from 'react'
import { useRouter } from 'next/router'
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const schemaValidation = Yup.object({
  nombre: Yup.string().required('El nombre del cliente es obligatorio'),
  existencia: Yup.number()
    .required('La cantidad disponible es obligatorio')
    .positive('No se aceltan números negativos')
    .integer('Debe ser números enteros'),
  precio: Yup.number()
    .required('El precio es obligatorio')
    .positive('No se aceptan números negativos')
})

function UpdateProductForm(props) {
  const route = useRouter()
  
  async function actualizarInfoProducto(event) {
    event.preventDefault();

    try {
      const { data } = await props.actualizarProducto({
        variables: {
          id: props?.cliente?.id,
          input: {
            nombre: props.values.nombre,
            existencia: props.values.existencia,
            precio: props.values.precio,
          }
        }
      })

      Swal.fire(
        'Actualizado!',
        'El producto se actualizó correctamente',
        'success'
      );
  
      route.push('/productos');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form
      onSubmit={actualizarInfoProducto}
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
          htmlFor="existencia"
          className="block text-slate-800 text-sm font-bold mb-2"
        >
          Cantidad Disponible
        </label>
        <input 
          id="existencia"
          type="number"
          name="existencia"
          value={props?.values?.existencia}
          onChange={props?.handleChange}
          onBlur={props?.handleBlur}
          placeholder="Apellido Cliente"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        />
      </div>

      {props?.touched?.existencia && props?.errors?.existencia ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
          <p className="font-bold">Error</p>
          <p>{props?.errors?.existencia}</p>
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
          value={props?.values?.precio}
          onChange={props?.handleChange}
          onBlur={props?.handleBlur}
          placeholder="Empresa Cliente"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        />
      </div>

      {props?.touched?.precio && props?.errors?.precio ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4">
          <p className="font-bold">Error</p>
          <p>{props?.errors?.empresa}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={props.isSubmitting}
        className="block bg-slate-800 w-full mt-5 p-2 uppercase rounded hover:bg-slate-900"
      >
        Editar producto
      </button>
    </Form>
  )
}


export const formikEnhancer = withFormik({
  mapPropsToValues: (props) => ({
    nombre: props.cliente.nombre,
    existencia: props.cliente.existencia,
    precio: props.cliente.precio, 
  }),
  validationSchema: schemaValidation,
  displayName: 'UpdateProductForm',
})(UpdateProductForm);
