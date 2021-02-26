import React, { FC } from 'react'
import { STable } from './Table.styles'
import { useTable } from 'react-table'
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
      <div className={'table-body'}>
        <div className={'row'}></div>
        <div className={'row'}></div>
      </div>
    </STable>
  )
}

export default Table
