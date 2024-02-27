import '../../__mocks__/routerMock'
import React from "react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { mockPedidos, errorMockPedidos } from '../../test/data-mocks'

import Pedidos from "@/pages/pedidos";
import Order from "@/components/Order";

describe('<Pedidos /> component', () => {
  it('should render loading state', async () => {
    render(
      <MockedProvider mocks={mockPedidos} addTypename={false}>
          <Pedidos />
      </MockedProvider>
    )
    expect(screen.getByText(/Cargando pedidos/i)).toBeInTheDocument();
  })

  it('Should render error state', async () => {
    render(
      <MockedProvider mocks={errorMockPedidos} addTypename={false}>
          <Pedidos />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error de carga de los pedidos/i)).toBeInTheDocument()
    })
  })

  it('Should render data', async () => {
    render(
      <MockedProvider mocks={mockPedidos} addTypename={false}>
          <Pedidos />
      </MockedProvider>
    )

    expect(await screen.findByText(/iPhone 14/i)).toBeInTheDocument()
  })
})
