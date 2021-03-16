import React from 'react'
import Modal from './index'
import { MdDelete } from 'react-icons/md'
import { render, screen, within, fireEvent } from '@testing-library/react'

import { columns, data } from '../mockTesting/data'
import { tColumn } from '../Table/table'

describe('Modal', () => {
  let mockSubmit = jest.fn()
  let fields: tColumn[]
  beforeAll(() => {
    fields = columns.filter((c) => c.Header !== 'Actions')
  })

  test('renders properly', () => {
    render(<Modal onSubmit={mockSubmit} fields={fields} show />)
  })

  test('is hidden by default', () => {
    const { getByTestId } = render(<Modal onSubmit={mockSubmit} fields={fields} />)
    let addRowModal = getByTestId('add-row-modal')
    expect(addRowModal).not.toBeVisible()
  })

  test('is display correct input-fields based on columns', () => {
    const { getByTestId } = render(<Modal onSubmit={mockSubmit} fields={fields} show />)
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
      const { getByTestId } = render(<Modal onSubmit={mockSubmit} fields={fields} show />)
      const addRowModal = getByTestId('add-row-modal')
      const closeSvg = getByTestId('close-btn')

      fireEvent.click(closeSvg)
      expect(addRowModal).not.toBeVisible()
    })

    test('on submit', () => {
      const { getByTestId, getByText } = render(<Modal onSubmit={mockSubmit} fields={fields} show />)
      const addRowModal = getByTestId('add-row-modal')
      const submitBtn = getByText('Add New Row')

      fireEvent.click(submitBtn)
      expect(addRowModal).not.toBeVisible()
    })
  })

  describe('Return correct data', () => {
    test('types should match each input', () => {
      const { getByTestId } = render(<Modal onSubmit={mockSubmit} fields={fields} show />)
      const addRowModal = getByTestId('add-row-modal')
      const inputs = Array.from(addRowModal.querySelectorAll('input'))

      for (const field of fields) {
        const input = inputs.find((input) => input.name === field.accessor)

        expect(input?.getAttribute('type')).toEqual(field.type || 'text')
      }
    })
    test('on submit', () => {
      const onSubmit = jest.fn((values) => {
        expect(values).toEqual({
          name: 'name',
          surname: 'surname',
          phone: '1234123',
        })
      })
      const { getByTestId, getByText } = render(<Modal fields={fields} show onSubmit={onSubmit} />)
      const addRowModal = getByTestId('add-row-modal')
      const inputs = Array.from(addRowModal.querySelectorAll('input'))

      for (const field of fields) {
        const input = inputs.find((input) => input.name === field.accessor)

        const value = field.accessor === 'phone' ? 1234123 : field.accessor
        fireEvent.change(input as HTMLElement, { target: { value } })
      }

      const submitBtn = getByText('Add New Row')

      fireEvent.click(submitBtn)

      expect(onSubmit).toBeCalled()
    })
  })
})
