import dispatcher from '../dispatcher'
import { boardsActionTypes } from '../actionTypes'

/**
 * Dispatches an ADD_NEW_BOARD event to the dispatcher
 * @param {string} title Title of the new board to be created
 */
export function addNewBoard(title) {
    dispatcher.dispatch({
        type: boardsActionTypes.ADD_NEW_BOARD,
        title
    })
}
