import React from 'react'
import { shallow } from 'enzyme'

import { getEmptyBoard } from '../../_mocks/Board.mocks'

import * as boardsActions from '../../../src/actions/boardsActions'

import BoardsContainer from '../../../src/views/containers/BoardsContainer'
import BoardsWrapper from '../../../src/views/components/BoardsView/BoardsWrapper'

describe('BoardsContainer', () => {

    let board
    boardsActions.selectBoard = jest.fn()

    beforeEach(() => {
        board = getEmptyBoard()

        boardsActions.selectBoard.mockClear()
    })

    describe('BoardsWrapper', () => {
        it('should be passed proper props', () => {
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()

            expect(wrapper.find(BoardsWrapper).prop('onBoardClick'))
                .toBe(instance.selectBoard)
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
