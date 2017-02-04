import * as boardsActions from '../../src/actions/boardsActions'
import { boardsActionTypes } from '../../src/actionTypes'
import dispatcher from '../../src/dispatcher'

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
})
