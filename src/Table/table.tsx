import React, { FC } from 'react'
import { STable } from './Table.styles'

type tTable = {
  columns: string[]
}

const Table: FC<tTable> = ({ columns }) => {
  return (
    <STable>
      <header>{columns.map((col) => col)}</header>
    </STable>
  )
}

export default Table
