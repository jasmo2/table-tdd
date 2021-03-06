import React from 'react'
import { MdDelete } from 'react-icons/md'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { columns, data } from '../mockTesting/data'

import Table from './table'
import App from '../App'

describe('Table', () => {
  test('renders properly', () => {
    render(<Table columns={columns} data={data} />)
  })

  test('Header base on input', () => {
    render(<Table columns={columns} data={data} />)

    for (const column of columns) {
      const header = screen.getByText(new RegExp(column.Header))
      expect(header).not.toBeNull()
    }
  })

  test('display Rows correctly', () => {
    const { container, getAllByRole } = render(<Table columns={columns} data={data} />)
    expect(container.querySelector('.table-body')?.firstElementChild).toHaveClass('row')
    const rows = getAllByRole('row')

    const numberOfRows = data.length + 1
    expect(rows.length).toEqual(numberOfRows)
  })

  test('display Cell data correctly', () => {
    const { container } = render(<Table columns={columns} data={data} />)
    const rowEl = container.querySelector('.table-body')?.firstElementChild as HTMLElement
    expect(rowEl.firstElementChild).toHaveClass('cell')

    const row = within(rowEl)
    const firstRowData = data[0]
    expect(row.getByText(new RegExp(firstRowData.name))).toBeInTheDocument()
    expect(row.getByText(new RegExp(firstRowData.phone))).toBeInTheDocument()
    expect(row.getByText(new RegExp(firstRowData.surname))).toBeInTheDocument()
    expect(rowEl.querySelector('.svg-wrapper')).toBeInTheDocument()
  })

  describe('Sort', () => {
    // @ts-ignore
    function sortTableTrigger({ getAllByRole, within, fireEvent }) {
      let rows = getAllByRole('row')
      const tableHeader = rows[0]
      const firstHeaderLabel = within(tableHeader).getAllByRole('columnheader')[0]
      expect(firstHeaderLabel).toHaveTextContent('Name')

      fireEvent.click(firstHeaderLabel)
      rows = getAllByRole('row')
      return rows
    }

    test('if sorted enable the colums should rearrange', () => {
      let { getAllByRole } = render(<Table columns={columns} data={data} sort />)
      const rows = sortTableTrigger({ fireEvent, getAllByRole, within })
      const tableFirstRow = rows[1].firstElementChild

      expect(tableFirstRow).toHaveTextContent('Adrian')
    })
    test('sort shall be disabled by default', () => {
      let { getAllByRole } = render(<Table columns={columns} data={data} />)
      const rows = sortTableTrigger({ fireEvent, getAllByRole, within })
      const tableFirstRow = rows[1].firstElementChild

      expect(tableFirstRow).toHaveTextContent('Miguel')
    })
  })

  describe('Events', () => {
    describe('Row Click', () => {
      test('enabled', () => {
        let handleClick = jest.fn((response) => {
          return response
        })

        const { getAllByRole } = render(<Table columns={columns} data={data} onClick={handleClick} />)
        const rows = getAllByRole('row')
        rows.shift()

        fireEvent.click(rows[0])
        expect(handleClick).toHaveBeenCalled()

        expect(handleClick.mock.calls[0][0].name).toBe(data[0].name)
      })
      test('disabled', () => {
        let handleClick = jest.fn()
        const { getAllByRole } = render(<Table columns={columns} data={data} />)
        const rows = getAllByRole('row')
        rows.shift()

        fireEvent.click(rows[0])
        expect(handleClick).toHaveBeenCalledTimes(0)
      })
    })

    describe('Delete Row', () => {
      test('icon shall always exists', () => {
        const { getAllByRole } = render(<Table columns={columns} data={data} />)
        const rows = getAllByRole('row')
        rows.shift()

        rows.forEach((row) => {
          expect(row.querySelector('svg')).not.toBeNull()
        })
      })

      test('click on trash item', () => {
        const { getAllByRole, queryByText, debug } = render(<App />)
        let rows = getAllByRole('row')
        rows.shift()
        const rowToDelete = rows[1]
        fireEvent.click(rowToDelete.querySelector('.svg-wrapper') as HTMLElement)

        const cell = queryByText('Adrian')
        expect(cell).not.toBeInTheDocument()
      })
    })

    describe('Add row', () => {
      test('click external add button', () => {
        const { getByText, getAllByRole, getByTestId, debug } = render(<App />)
        let rows = getAllByRole('row')
        rows.shift()
        const initialRowsCount = rows.length

        const addButton = getByText('Add Row')
        expect(addButton).toBeInTheDocument()
        let addRowModal = getByTestId('add-row-modal')
        expect(addRowModal).not.toBeVisible()

        fireEvent.click(addButton)
        addRowModal = getByTestId('add-row-modal')
        expect(addRowModal).toBeVisible()
        expect(addRowModal).toHaveFormValues({
          name: '',
          surname: '',
          phone: '',
        })

        const inputs = Array.from(addRowModal.querySelectorAll('input'))
        const fields = columns.filter((c) => c.Header !== 'Actions')

        for (const field of fields) {
          const input = inputs.find((input) => input.name === field.accessor)

          const value = field.accessor === 'phone' ? 1234123 : field.accessor
          fireEvent.change(input as HTMLElement, { target: { value } })
        }

        const submitBtn = getByText('Add New Row')
        fireEvent.click(submitBtn)

        rows = getAllByRole('row')

        expect(rows.length).toEqual(5)

        debug(rows)
      })
    })
  })
})
