import * as boardActions from '../../src/actions/boardActions'
import { boardActionTypes } from '../../src/actionTypes'
import dispatcher from '../../src/dispatcher'

describe('boardActions', () => {

    const card = { listId: 'someId', id: 'someOther', title: 'card' }
    dispatcher.dispatch = jest.fn()

    beforeEach(() => {
        dispatcher.dispatch.mockClear()
    })

    describe('addNewList', () => {
        it('should pass the proper params to dispatcher', () => {
            boardActions.addNewList('list title')
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1)
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: boardActionTypes.ADD_NEW_LIST, listTitle: 'list title' })
        })
    })

    describe('saveCard', () => {
        it('should pass the proper params to dispatcher', () => {
            boardActions.saveCard({ listId: 'someId', id: 'someOther', title: 'card' })
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1)
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: boardActionTypes.SAVE_CARD, card: card })
        })
    })
})
