import * as boardActions from '../../src/actions/boardActions'
import { boardActionTypes } from '../../src/actionTypes'
import dispatcher from '../../src/dispatcher'

import { getBasicCard } from '../_mocks/Card.mocks'

describe('boardActions', () => {

    const card = getBasicCard()
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
            boardActions.saveCard(card)
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1)
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: boardActionTypes.SAVE_CARD, card: card })
        })
    })

    describe('deleteCard', () => {
        it('should pass the proper params to dispatcher', () => {
            boardActions.deleteCard(card)
            expect(dispatcher.dispatch).toHaveBeenCalledTimes(1)
            expect(dispatcher.dispatch).toHaveBeenCalledWith({ type: boardActionTypes.DELETE_CARD, card: card })
        })
    })
})
