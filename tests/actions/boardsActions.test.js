import * as boardsActions from '../../src/actions/boardsActions'
import { boardsActionTypes } from '../../src/actionTypes'
import dispatcher from '../../src/dispatcher'

import { getEmptyBoard } from '../_mocks/Board.mocks'

describe('boardsActions', () => {

    let board
    dispatcher.dispatch = jest.fn()

    beforeEach(() => {
        board = getEmptyBoard()
        dispatcher.dispatch.mockClear()
    })

    describe('selectBoard', () => {
        it('should pass proper params to dispatcher', () => {
            boardsActions.selectBoard(board)
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1)
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: boardsActionTypes.SELECT_BOARD,
                board
            })
        })
    })
})
