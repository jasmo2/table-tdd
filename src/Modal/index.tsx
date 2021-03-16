import React, { FC } from 'react'
import { tData } from '../Table/table'
import { SModal } from './modal.styles'

interface tModal extends tData {
  show: boolean
}

const Modal: FC<tModal> = ({ data, show = false }) => {
  return <SModal show={show} data-testid="add-row-modal"></SModal>
}

export default Modal
