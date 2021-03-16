import { MdDelete } from 'react-icons/md'
import React from 'react'

export const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Surname', accessor: 'surname' },
  { Header: 'Phone', accessor: 'phone', type: 'phone' },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: (props: any) => {
      return (
        <div
          onClick={() => {
            /*
        Logic to delete Row in a table
        // ES6 Syntax use the rvalue if your data åis an array.
        const dataCopy = [...data]
        // It should not matter what you name tableProps. It made the most sense to me.
        dataCopy.splice(props.row.index, 1)
        setData(dataCopy)
        */
          }}
          className={'svg-wrapper'}
        >
          {props.value}
        </div>
      )
    },
  },
]

export const data = [
  { name: 'Miguel', surname: 'Kun', phone: '123123', actions: <MdDelete /> },
  { name: 'Adrian', surname: 'Miyuki', phone: '678654', actions: <MdDelete /> },
  { name: 'Tatiana', surname: 'Min', phone: '980980', actions: <MdDelete /> },
]
