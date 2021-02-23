import React from 'react'
import { render, screen } from '@testing-library/react'
import Table from './table'

const columns = ['Name', 'Surname', 'Phone', 'Actions']

describe('Table', () => {
  test('renders Table properly', () => {
    render(<Table />)
  })

  test('Header base on input', () => {
    render(<Table columns={columns} />)

    for (const column of columns) {
      const header = screen.getByText(new RegExp(column))
      expect(header).not.toBeNull()
    }
  })
})
