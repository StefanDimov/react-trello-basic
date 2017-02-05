import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { getEmptyBoard } from '../../../_mocks/Board.mocks.js'

import BoardItem from '../../../../src/views/components/BoardsView/BoardItem'

describe('BoardItem', () => {

    let board
    const onDeleteBoard = jest.fn()

    beforeEach(() => {
        board = getEmptyBoard()
        onDeleteBoard.mockReset()
    })

    describe('rendering', () => {
        it('should render correctly', () => {
            const tree = renderer.create(
                <BoardItem board={board} onDeleteBoard={onDeleteBoard} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })

    describe('dropdown options', () => {
        it('should properly call onDeleteBoard callback on Delete option click', () => {
            const wrapper = mount(<BoardItem board={board} onDeleteBoard={onDeleteBoard} />)

            wrapper.find('.dropdown button').simulate('click')
            wrapper.find('.dropdown li').first().find('a').simulate('click')

            expect(onDeleteBoard).toHaveBeenCalledTimes(1)
            expect(onDeleteBoard).toHaveBeenCalledWith(board)
        })
    })
})
