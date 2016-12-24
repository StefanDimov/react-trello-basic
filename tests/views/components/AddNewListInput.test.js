import React from 'react'
import { shallow } from 'enzyme'

import AddNewListInput from '../../../src/views/components/AddNewListInput'
import { FormGroup, FormControl } from 'react-bootstrap'

describe('AddNewListInput', () => {

    const inputChangeEventDataWithName = {
        target: { value: 'list name' }
    }
    let onCreateList = jest.fn()

    beforeEach(() => {
        onCreateList.mockClear()
    })

    describe('container', () => {
        it('should be a form element', () => {
            const wrapper = shallow(<AddNewListInput onCreateList={onCreateList} />)
            expect(wrapper.is('form')).toBe(true)
        })

        it('should have proper custom styles', () => {
            const wrapper = shallow(<AddNewListInput onCreateList={onCreateList} />)
            expect(wrapper.prop('className')).toBe('my-list-container-item')
        })

        it('should call onCreateList with the new list\'s name on submit', () => {
            const wrapper = shallow(<AddNewListInput onCreateList={onCreateList} />)

            const eventMock = { preventDefault: jest.fn() }

            wrapper.simulate('submit', eventMock)
            expect(onCreateList.mock.calls[0][0]).toBe('')

            wrapper.find(FormControl).simulate('change', inputChangeEventDataWithName)
            wrapper.simulate('submit', eventMock)
            expect(onCreateList.mock.calls[1][0]).toBe(inputChangeEventDataWithName.target.value)
        })
    })

    describe('input', () => {
        it('should be represented by a FormControl', () => {
            const wrapper = shallow(<AddNewListInput onCreateList={onCreateList} />)
            expect(wrapper.find(FormControl).length).toBe(1)
        })

        it('should be wrapped by a FormGroup', () => {
            const wrapper = shallow(<AddNewListInput onCreateList={onCreateList} />)
            expect(wrapper.find(FormControl).parent().is(FormGroup)).toBe(true)
        })

        it('should update state on change', () => {
            const wrapper = shallow(<AddNewListInput onCreateList={onCreateList} />)

            expect(wrapper.find(FormControl).prop('value')).toBe('')

            wrapper.find(FormControl).simulate('change', inputChangeEventDataWithName)
            expect(wrapper.find(FormControl).prop('value')).toBe(inputChangeEventDataWithName.target.value)
        })
    })
})
