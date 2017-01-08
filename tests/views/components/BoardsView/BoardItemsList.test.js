import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { getEmptyBoard } from '../../../_mocks/Board.mocks.js'

import BoardItemsList from '../../../../src/views/components/BoardsView/BoardItemsList'
import BoardItem from '../../../../src/views/components/BoardsView/BoardItem'

describe('BoardItemsList', () => {

    const onBoardClick = jest.fn()
    let board, anotherBoard, thirdBoard

    beforeEach(() => {
        board = getEmptyBoard(1)
        anotherBoard = getEmptyBoard(2)
        thirdBoard = getEmptyBoard(3)

        onBoardClick.mockClear()
    })

    describe('rendering', () => {

        it('should render properly with no boards', () => {
            const tree = renderer.create(
                <BoardItemsList boards={[]} onBoardClick={onBoardClick}/>
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render properly with one board', () => {
            const tree = renderer.create(
                <BoardItemsList boards={[board]} onBoardClick={onBoardClick} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render properly with multiple boards', () => {
            const tree = renderer.create(
                <BoardItemsList boards={[board, anotherBoard, thirdBoard]} onBoardClick={onBoardClick} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })

    describe('onBoardClick', () => {
        it('should be set on all BoardItems container', () => {
            const wrapper = shallow(
                <BoardItemsList boards={[board, anotherBoard]} onBoardClick={onBoardClick} />
            )

            const firstContainer = wrapper.find(BoardItem).first().parent()
            const secondContainer = wrapper.find(BoardItem).last().parent()

            expect(firstContainer.prop('onClick')).toBeDefined()
            expect(secondContainer.prop('onClick')).toBeDefined()
        })

        it('should be called with appropriate params on click', () => {
            const wrapper = shallow(
                <BoardItemsList boards={[board]} onBoardClick={onBoardClick} />
            )

            const container = wrapper.find(BoardItem).parent()
            container.simulate('click')

            expect(onBoardClick).toHaveBeenCalledTimes(1)
            expect(onBoardClick).toHaveBeenCalledWith(board)
        })
    })
})
