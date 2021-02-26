import React, { FC } from 'react'
import { STable } from './Table.styles'
import { useTable } from 'react-table'
type tColumn = {
  Header: string
  accessor: string
}

type tTable = {
  columns: tColumn[]
  data: { [s: string]: any }[]
}

const Table: FC<tTable> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })
  return (
    <STable {...getTableProps()}>
      <header>
        {headerGroups.map((headerGroup, i) => (
          <h3 {...headerGroup.getHeaderGroupProps()} key={`column-${i}`}>
            {headerGroup.headers.map((column) => (
              <>{column.render('Header')}</>
            ))}
          </h3>
        ))}
      </header>
      <div className={'table-body'} {...getTableBodyProps}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <div className={'row'} {...row.getRowProps()} key={`row-${i}`}>
              {row.cells.map((cell) => cell.render('Cell'))}
            </div>
          )
        })}
      </div>
    </STable>
  )
}

export default Table
