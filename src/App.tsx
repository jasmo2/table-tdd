import React from 'react'
import Table from './Table/table'
import { MdDelete } from 'react-icons/md'

const dData = [
  { name: 'Miguel', surname: 'Kun', phone: '123123', actions: <MdDelete /> },
  { name: 'Adrian', surname: 'Miyagui', phone: '678654', actions: <MdDelete /> },
  { name: 'Tatiana', surname: 'Min', phone: '980980', actions: <MdDelete /> },
]

const App = ({ columns = null, data = dData }) => {
  const [newData, setData] = React.useState(React.useMemo(() => data, []))

  const newColumns = React.useMemo(() => {
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

  // @ts-ignore
  return <Table columns={newColumns} data={newData} sort />
}

export default App
