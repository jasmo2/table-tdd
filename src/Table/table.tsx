import React, { FC } from 'react'
import { STable } from './Table.styles'
import { Accessor, Column } from 'react-table'
type tColumn = {
  Header: string
  accessor: string
}

type tTable = {
  columns: tColumn[]
}

const Table: FC<tTable> = ({ columns }) => {
  return (
    <STable>
      <header>
        {columns.map(({ Header, accessor }, i) => (
          <h3 key={`header-${i}`}>{Header}</h3>
        ))}
      </header>
    </STable>
  )
}

export default Table
