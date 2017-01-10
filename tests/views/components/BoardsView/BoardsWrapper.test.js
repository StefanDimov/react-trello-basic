import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { getEmptyBoard } from '../../../_mocks/Board.mocks'

import BoardsWrapper from '../../../../src/views/components/BoardsView/BoardsWrapper'
import BoardItemsList from '../../../../src/views/components/BoardsView/BoardItemsList'

describe('BoardsWrapper', () => {

    const onBoardClick = jest.fn()
    const onCreateBoard = jest.fn()
    let board, anotherBoard, thirdBoard

    beforeEach(() => {
        board = getEmptyBoard(1)
        anotherBoard = getEmptyBoard(2)
        thirdBoard = getEmptyBoard(3)

        onBoardClick.mockClear()
        onCreateBoard.mockClear()
    })

    describe('rendering', () => {
        it('should render correctly with no boards', () => {
            const tree = renderer.create(
                <BoardsWrapper boards={[]} onBoardClick={onBoardClick} onCreateBoard={onCreateBoard} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render correctly with one board', () => {
            const tree = renderer.create(
                <BoardsWrapper boards={[board]} onBoardClick={onBoardClick} onCreateBoard={onCreateBoard} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render correctly with multiple boards', () => {
            const tree = renderer.create(
                <BoardsWrapper boards={[board, anotherBoard, thirdBoard]} onBoardClick={onBoardClick} onCreateBoard={onCreateBoard} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })

    describe('BoardItemsList', () => {
        it('should be passed correct params', () => {
            const wrapper = shallow(
                <BoardsWrapper boards={[board]} onBoardClick={onBoardClick} onCreateBoard={onCreateBoard} />
            )

            expect(wrapper.find(BoardItemsList).prop('onBoardClick')).toBe(onBoardClick)
            expect(wrapper.find(BoardItemsList).prop('onCreateBoard')).toBe(onCreateBoard)
        })
    })
})
