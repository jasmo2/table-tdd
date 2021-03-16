import React from 'react'
import Modal from './index'
import { MdDelete } from 'react-icons/md'
import { render, screen, within, fireEvent } from '@testing-library/react'

import { columns, data } from '../mockTesting/data'
import { tColumn } from '../Table/table'

describe('Modal', () => {
  let fields: tColumn[]
  beforeAll(() => {
    fields = columns.filter((c) => c.Header !== 'Actions')
  })

  test('renders properly', () => {
    render(<Modal fields={fields} show />)
  })

  test('is hidden by default', () => {
    const { getByTestId } = render(<Modal fields={fields} />)
    let addRowModal = getByTestId('add-row-modal')
    expect(addRowModal).not.toBeVisible()
  })

  test('is display correct input-fields based on columns', () => {
    const { getByTestId } = render(<Modal fields={fields} show />)
    let addRowModal = getByTestId('add-row-modal')
    expect(addRowModal).toBeVisible()
    expect(addRowModal).toHaveFormValues({
      name: '',
      surname: '',
      phone: '',
    })
  })

  describe('Close', () => {
    test('on svg button', () => {
      const { getByTestId } = render(<Modal fields={fields} show />)
      const addRowModal = getByTestId('add-row-modal')
      const closeSvg = getByTestId('close-btn')

      fireEvent.click(closeSvg)
      expect(addRowModal).not.toBeVisible()
    })

    test('on submit', () => {
      const { getByTestId, getByText } = render(<Modal fields={fields} show />)
      const addRowModal = getByTestId('add-row-modal')
      const submitBtn = getByText('Add New Row')

      fireEvent.click(submitBtn)
      expect(addRowModal).not.toBeVisible()
    })
  })
})
