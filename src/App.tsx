import React from 'react'
import Table from './Table/table'
import { MdDelete } from 'react-icons/md'

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
  { name: 'Adrian', surname: 'Miyagui', phone: '678654', actions: <MdDelete /> },
  { name: 'Tatiana', surname: 'Min', phone: '980980', actions: <MdDelete /> },
]
function App() {
  return <Table columns={columns} data={data} sort />
}

export default App
