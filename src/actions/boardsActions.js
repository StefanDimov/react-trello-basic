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

/**
 * Dispatches a DELETE_BOARD event to the dispatcher
 * @param {object} board The board that should be deleted
 */
export function deleteBoard(board) {
    dispatcher.dispatch({
        type: boardsActionTypes.DELETE_BOARD,
        board
    })
}
