import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import AddNewListInput from '../../../src/views/components/AddNewListInput'
import { FormGroup, FormControl } from 'react-bootstrap'

describe('AddNewListInput', () => {

    const inputChangeEventDataWithName = {
        target: { value: 'list name' }
    }
    const onCreateList = jest.fn()

    beforeEach(() => {
        onCreateList.mockClear()
    })

    it('should render correctly', () => {
        const tree = renderer.create(
            <AddNewListInput onCreateList={onCreateList} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('should call onCreateList with the new list\'s name on submit', () => {
        const eventMock = { preventDefault: jest.fn() }

        const wrapper = shallow(<AddNewListInput onCreateList={onCreateList} />)

        wrapper.simulate('submit', eventMock)
        expect(onCreateList).toHaveBeenLastCalledWith('')

        wrapper.find(FormControl).simulate('change', inputChangeEventDataWithName)
        wrapper.simulate('submit', eventMock)
        expect(onCreateList).toHaveBeenLastCalledWith(inputChangeEventDataWithName.target.value)
    })

    it('should update state on change', () => {
        const wrapper = shallow(<AddNewListInput onCreateList={onCreateList} />)

        expect(wrapper.find(FormControl).prop('value')).toBe('')

        wrapper.find(FormControl).simulate('change', inputChangeEventDataWithName)
        expect(wrapper.find(FormControl).prop('value')).toBe(inputChangeEventDataWithName.target.value)
    })
})
