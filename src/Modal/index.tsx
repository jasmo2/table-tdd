import React, { FC, FormEvent, useState } from 'react'
import { tColumn } from '../Table/table'
import { SModal } from './modal.styles'
import { MdClose } from 'react-icons/md'

interface tModal {
  show?: boolean
  fields: tColumn[]
}

const Modal: FC<tModal> = ({ fields, show = false }) => {
  const [visible, setVisible] = useState(show)
  const handleClose = () => setVisible(false)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleClose()
  }

  return (
    <SModal show={visible} data-testid="add-row-modal" onSubmit={handleSubmit}>
      <div className="wrapper">
        <MdClose className="close-btn" data-testid="close-btn" onClick={handleClose} />
        {fields.map((field) => {
          return <input key={field.Header} name={field.accessor} />
        })}
      </div>
      <button type="submit">Add New Row</button>
    </SModal>
  )
}

export default Modal
