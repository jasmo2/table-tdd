import React from 'react'
import { MdDelete } from 'react-icons/md'
import { render, screen, within } from '@testing-library/react'
import Table from './table'

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Surname', accessor: 'surname' },
  { Header: 'Phone', accessor: 'phone' },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: (props: any) => {
      return <div className={'svg-wrapper'}>{props.value}</div>
    },
  },
]

const data = [
  { name: 'Miguel', surname: 'Kun', phone: '123123', actions: <MdDelete /> },
  { name: 'Tatiana', surname: 'Min', phone: '980980', actions: <MdDelete /> },
]

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
    const { container } = render(<Table columns={columns} data={data} />)
    expect(container.querySelector('.table-body')?.firstElementChild).toHaveClass('row')

    const numberOfRows = data.length
    const rows = container.querySelectorAll('.row')
    expect(rows.length).toEqual(numberOfRows)
  })

  test('display Cell data correctly', () => {
    const { container, debug } = render(<Table columns={columns} data={data} />)
    const rowEl = container.querySelector('.table-body')?.firstElementChild as HTMLElement
    expect(rowEl.firstElementChild).toHaveClass('cell')

    const row = within(rowEl)
    const firstRowData = data[0]
    expect(row.getByText(new RegExp(firstRowData.name))).toBeInTheDocument()
    expect(row.getByText(new RegExp(firstRowData.phone))).toBeInTheDocument()
    expect(row.getByText(new RegExp(firstRowData.surname))).toBeInTheDocument()
    expect(rowEl.querySelector('.svg-wrapper')).toBeInTheDocument()
  })
})
