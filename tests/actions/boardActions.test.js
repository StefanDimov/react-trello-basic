import * as boardActions from '../../src/actions/boardActions'
import { boardActionTypes } from '../../src/actionTypes'
import dispatcher from '../../src/dispatcher'

describe('boardActions', () => {

    dispatcher.dispatch = jest.fn()

    beforeEach(() => {
        dispatcher.dispatch.mockClear()
    })

    describe('addNewList', () => {
        it('should pass the proper action type', () => {
            boardActions.addNewList('list title')
            expect(dispatcher.dispatch.mock.calls.length).toBe(1)
            expect(dispatcher.dispatch.mock.calls[0][0].type).toBe(boardActionTypes.ADD_NEW_LIST)
        })

        it('should pass the list name', () => {
            boardActions.addNewList('list title')
            expect(dispatcher.dispatch.mock.calls.length).toBe(1)
            expect(dispatcher.dispatch.mock.calls[0][0].listTitle).toBe('list title')
        })
    })
})
