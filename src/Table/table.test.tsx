import React from 'react'
import { render, screen } from '@testing-library/react'
import Table from './table'

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Surname', accessor: 'surname' },
  { Header: 'Phone', accessor: 'phone' },
  { Header: 'Actions', accessor: 'actions' },
]

describe('Table', () => {
  test('renders Table properly', () => {
    render(<Table columns={columns} />)
  })

  test('Header base on input', () => {
    render(<Table columns={columns} />)

    for (const column of columns) {
      const header = screen.getByText(new RegExp(column.Header))
      expect(header).not.toBeNull()
    }
  })
})
