import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { tColumn } from '../Table/table'
import { SModal } from './modal.styles'
import { MdClose } from 'react-icons/md'

interface tModal {
  show?: boolean
  fields: tColumn[]
  onSubmit: Function
}

const Modal: FC<tModal> = ({ fields, show = false, onSubmit }) => {
  const [visible, setVisible] = useState(show)
  const [values, setValues] = useState({})
  const handleClose = () => setVisible(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setValues((prev) => {
      return { ...prev, [target.name]: target.value }
    })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(values)
    handleClose()
  }

  return (
    <SModal show={visible} data-testid="add-row-modal" onSubmit={handleSubmit}>
      <div className="wrapper">
        <MdClose className="close-btn" data-testid="close-btn" onClick={handleClose} />
        {fields.map((field) => {
          return <input onChange={handleChange} type={field.type || 'text'} key={field.Header} name={field.accessor} />
        })}
      </div>
      <button type="submit">Add New Row</button>
    </SModal>
  )
}

export default Modal
