import React, { useState, useMemo } from 'react'
import Table, { tColumn, tData } from './Table/table'
import Modal from './Modal'
import { MdDelete } from 'react-icons/md'

const dData = [
  { name: 'Miguel', surname: 'Kun', phone: '123123', actions: <MdDelete /> },
  { name: 'Adrian', surname: 'Miyagui', phone: '678654', actions: <MdDelete /> },
  { name: 'Tatiana', surname: 'Min', phone: '980980', actions: <MdDelete /> },
]

const App = ({ columns = null, data = dData }) => {
  const [show, setShow] = useState(false)
  const [newData, setData] = useState(useMemo(() => data, []))

  // @ts-ignore
  const newColumns: tColumn[] = useMemo(() => {
    if (!columns) {
      return [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Surname', accessor: 'surname' },
        { Header: 'Phone', accessor: 'phone' },
        {
          Header: 'Actions',
          accessor: 'actions',
          Cell: (props: any) => {
            return (
              <div
                onClick={() => {
                  // ES6 Syntax use the rvalue if your data åis an array.
                  const dataCopy = [...data]
                  // It should not matter what you name tableProps. It made the most sense to me.
                  dataCopy.splice(props.row.index, 1)
                  setData(dataCopy)
                }}
                className={'svg-wrapper'}
              >
                {props.value}
              </div>
            )
          },
        },
      ]
    } else {
      return columns
    }
  }, [newData, columns])

  const handleSubmit = (values: any) => {
    console.log('TCL: values', values)
    setData((prev) => {
      return prev.concat(values)
    })
  }
  const filters = useMemo(() => {
    return newColumns.filter((c) => c.Header !== 'Actions')
  }, [newColumns])

  return (
    <>
      <div>
        <Table columns={newColumns} data={newData} sort />
        <button onClick={() => setShow((prev) => !prev)}>Add Row</button>
      </div>
      <Modal show={show} fields={filters} onSubmit={handleSubmit} />
    </>
  )
}

export default App
