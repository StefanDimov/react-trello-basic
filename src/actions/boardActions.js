/** @module boardActions */
import dispatcher from '../dispatcher'
import { boardActionTypes } from '../actionTypes'

/**
 * Dispatches a LOAD_BOARD event to the dispatcher
 * @param  {string} boardId The id of the board to be loaded
 */
export function loadBoard(boardId) {
    dispatcher.dispatch({
        type: boardActionTypes.LOAD_BOARD,
        boardId
    })
}

/**
 * Dispatches a ADD_NEW_LIST event to the dispatcher
 * @param {string} listTitle Title of the list to be added
 */
export function addNewList(listTitle) {
    dispatcher.dispatch({
        type: boardActionTypes.ADD_NEW_LIST,
        listTitle
    })
}

/**
 * Dispatches a SAVE_CARD event to the dispatcher
 * @param {object} card Card to save
 */
export function saveCard(card) {
    dispatcher.dispatch({
        type: boardActionTypes.SAVE_CARD,
        card
    })
}

/**
 * Dispatches a DELETE_CARD event to the dispatcher
 * @param {object} card Card to delete
 */
export function deleteCard(card) {
    dispatcher.dispatch({
        type: boardActionTypes.DELETE_CARD,
        card: card
    })
}

/**
 * Dispatches a COPY_CARD event to the dispatcher
 * @param {object} card Card to copy
 */
export function copyCard(card) {
    dispatcher.dispatch({
        type: boardActionTypes.COPY_CARD,
        card: card
    })
}
