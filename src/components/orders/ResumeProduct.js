import React, { useState, useContext, useEffect } from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'

function ResumeProduct({ producto }) {
  const [cantidad, setCantidad] = useState(0)
  const pedidoContext = useContext(PedidoContext)
  const { agregarCantidadProductos, actualizarTotal } = pedidoContext

  function agregarCantidad(event) {
    setCantidad(event.target.value)
  }

  function actualizarCantidad() {
    const nuevoProduto = {
      ...producto,
      cantidad: Number(cantidad)
    }

    agregarCantidadProductos(nuevoProduto)
  }

  useEffect(() => {
    actualizarCantidad();
    actualizarTotal();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cantidad])

  return (
    <div className="flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-slate-700 text-sm">
          {producto.nombre}
        </p>
        <p className="text-slate-700 text-md font-bold">
          ${producto.precio}
        </p>
      </div>
        <input
          value={cantidad}
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          onChange={agregarCantidad}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        />
    </div>
  )
}

export default ResumeProduct
