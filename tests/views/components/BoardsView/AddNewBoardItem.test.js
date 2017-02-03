import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { FormControl } from 'react-bootstrap'

import AddNewBoardInput from '../../../../src/views/components/BoardsView/AddNewBoardInput'

describe('AddNewBoardInput', () => {

    const inputChangeEventDataWithName = { target: { value: 'list name' } }
    const onCreateBoard = jest.fn()

    beforeEach(() => {
        onCreateBoard.mockClear()
    })

    it('should render correctly', () => {
        const tree = renderer.create(
            <AddNewBoardInput onCreateBoard={onCreateBoard} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('should call onCreateBoard with the new list\'s name on submit', () => {
        const eventMock = { preventDefault: jest.fn() }

        const wrapper = shallow(<AddNewBoardInput onCreateBoard={onCreateBoard} />)

        wrapper.find(FormControl).simulate('change', inputChangeEventDataWithName)
        wrapper.simulate('submit', eventMock)

        expect(onCreateBoard).toHaveBeenLastCalledWith(inputChangeEventDataWithName.target.value)
        expect(eventMock.preventDefault).toHaveBeenCalled()
    })

    it('should update state on change', () => {
        const wrapper = shallow(<AddNewBoardInput onCreateBoard={onCreateBoard} />)
        wrapper.find(FormControl).simulate('change', inputChangeEventDataWithName)
        expect(wrapper.find(FormControl).prop('value')).toBe(inputChangeEventDataWithName.target.value)
    })

})
