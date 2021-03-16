import React, { FC } from 'react'
import { STable } from './Table.styles'
import { useTable, useSortBy } from 'react-table'
export type tColumn = {
  Header: string
  accessor: string
}

export interface tData {
  [s: string]: any
}
type tTable = {
  columns: tColumn[]
  data: tData[]
  sort?: boolean
  onClick?: null | Function
}

const Table: FC<tTable> = ({ columns, data, sort = false, onClick = null }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      disableSortBy: !sort,
    },
    useSortBy
  )

  function handleClick(original: tData) {
    if (onClick) {
      onClick(original)
    }
  }
  // @ts-ignore
  return (
    <STable {...getTableProps()}>
      <header>
        {headerGroups.map((headerGroup, i) => (
          <h3 {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // @ts-ignore
              <span {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</span>
            ))}
          </h3>
        ))}
      </header>
      <div className={'table-body'} {...getTableBodyProps}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <div {...row.getRowProps()} className={'row'} key={`row-${i}`} onClick={() => handleClick(row.original)}>
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
