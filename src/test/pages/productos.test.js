import '../../__mocks__/routerMock'
import React from 'react';
import userEvent from "@testing-library/user-event";
import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'
import { mockProductos, errorMockProductos } from '../../test/data-mocks'

import Productos from '@/pages/productos';
import Product from '@/components/Product';

describe('<Productos /> components', () => {

  it('should render a loading state', async () => {
    render(
      <MockedProvider mocks={mockProductos} addTypename={false}> 
        <Productos />
      </MockedProvider>
    )

    expect(screen.getByText(/Cargando productos/i)).toBeInTheDocument()
  })

  it('should render a error state', async () => {
    render(
      <MockedProvider mocks={errorMockProductos} addTypename={false}>
        <Productos />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error en la carga de los productos/i)).toBeInTheDocument();
    })
  })

  it('should render a product', async () => {
    render(
      <MockedProvider mocks={mockProductos} addTypename={false}>
        <Productos />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/iPhone 12/i)).toBeInTheDocument()

    })
  })
})



