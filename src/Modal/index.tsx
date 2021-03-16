import React, { FC } from 'react'
import { tColumn } from '../Table/table'
import { SModal } from './modal.styles'

interface tModal {
  show: boolean
  fields: tColumn[]
}

const Modal: FC<tModal> = ({ fields, show = false }) => {
  return (
    <SModal show={show} data-testid="add-row-modal">
      <div className="wrapper">
        {fields.map((field) => {
          return <input key={field.Header} name={field.accessor} />
        })}
      </div>
    </SModal>
  )
}

export default Modal
