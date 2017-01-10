import React from 'react'
import { shallow } from 'enzyme'

import { getEmptyBoard } from '../../_mocks/Board.mocks'

import boardsStore from '../../../src/stores/boardsStore'
import * as boardsActions from '../../../src/actions/boardsActions'

import BoardsContainer from '../../../src/views/containers/BoardsContainer'
import BoardsWrapper from '../../../src/views/components/BoardsView/BoardsWrapper'

describe('BoardsContainer', () => {

    let board
    boardsStore.getBoards = jest.fn()
    boardsActions.selectBoard = jest.fn()

    beforeEach(() => {
        board = getEmptyBoard()

        boardsStore.getBoards.mockReset()
        boardsStore.getBoards.mockReturnValue([])

        boardsActions.selectBoard.mockClear()
    })

    describe('boardsStore integration', () => {
        it('should get boards on mount', () => {
            shallow(<BoardsContainer />)
            expect(boardsStore.getBoards).toHaveBeenCalledTimes(1)
        })
    })

    describe('BoardsWrapper', () => {
        it('should be passed proper props', () => {
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()

            expect(wrapper.find(BoardsWrapper).prop('onBoardClick'))
                .toBe(instance.selectBoard)
            expect(wrapper.find(BoardsWrapper).prop('onCreateBoard'))
                .toBe(instance.createBoard)
        })
    })

    describe('selecting a board', () => {
        it('should pass proper url to router context', () => {
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()

            instance.context = {
                router: { push: jest.fn() }
            }

            instance.selectBoard(board)

            expect(instance.context.router.push).toHaveBeenCalledTimes(1)
            expect(instance.context.router.push).toHaveBeenCalledWith('/board/' + board.id)
        })
    })
})
