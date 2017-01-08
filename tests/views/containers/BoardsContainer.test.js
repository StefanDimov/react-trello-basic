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

    describe('actions', () => {
        it('should properly select board', () => {
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()

            instance.selectBoard(board)

            expect(boardsActions.selectBoard).toHaveBeenCalledTimes(1)
            expect(boardsActions.selectBoard).toHaveBeenCalledWith(board)
        })
    })
})
