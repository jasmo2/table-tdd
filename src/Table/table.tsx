import React, { FC } from 'react'
import { STable } from './Table.styles'
import { useTable, useSortBy } from 'react-table'
type tColumn = {
  Header: string
  accessor: string
}

type tTable = {
  columns: tColumn[]
  data: { [s: string]: any }[]
  sort?: null | boolean
}

const Table: FC<tTable> = ({ columns, data, sort = null }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )
  return (
    <STable {...getTableProps()}>
      <header>
        {headerGroups.map((headerGroup, i) => (
          <h3 {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <span {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</span>
            ))}
          </h3>
        ))}
      </header>
      <div className={'table-body'} {...getTableBodyProps}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <div className={'row'} {...row.getRowProps()} key={`row-${i}`}>
              {row.cells.map((cell) => (
                <span className={'cell'} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </span>
              ))}
            </div>
          )
        })}
      </div>
    </STable>
  )
}

export default Table
