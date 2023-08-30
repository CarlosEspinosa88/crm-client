import React, { useState, useEffect, useContext } from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'
import ResumeProduct from '@/components/orders/ResumeProduct'

export default function ResumeOrder() {
  const pedidoContext = useContext(PedidoContext)
  const { productos } = pedidoContext

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-slate-800 text-slate-700 p-2 text-sm font-bold">
        3 - Ajusta las cantidades del Producto
      </p>

      <div>
        {productos?.length > 0 ? (
          <>
            {productos.map((producto) => (
              <ResumeProduct key={producto.id} producto={producto} />
            ))}
          </>
        ) : (
          <p className="mt-5 text-slate-700 text-sm">
            Aún no hay productos 🥺
          </p>
        )}
      </div>
    </>
  )
}
