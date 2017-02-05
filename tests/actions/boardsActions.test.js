import * as boardsActions from '../../src/actions/boardsActions'
import { boardsActionTypes } from '../../src/actionTypes'
import dispatcher from '../../src/dispatcher'

import { getEmptyBoard } from '../_mocks/Board.mocks'

describe('boardsActions', () => {

    dispatcher.dispatch = jest.fn()

    beforeEach(() => {
        dispatcher.dispatch.mockClear()
    })

    describe('addNewBoard', () => {
        it('should pass the proper params to dispatcher', () => {
            const title = 'boardTitle'
            boardsActions.addNewBoard(title)
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1)
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: boardsActionTypes.ADD_NEW_BOARD,
                title
            })
        })
    })

    describe('deleteBoard', () => {
        it('should pass the proper params to dispatcher', () => {
            const board = getEmptyBoard()
            boardsActions.deleteBoard(board)
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1)
            expect(dispatcher.dispatch).toHaveBeenCalledWith({
                type: boardsActionTypes.DELETE_BOARD,
                board
            })
        })
    })
})
