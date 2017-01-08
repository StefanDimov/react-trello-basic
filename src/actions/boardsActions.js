import dispatcher from '../dispatcher'
import { boardsActionTypes } from '../actionTypes'

export function selectBoard(board) {
    dispatcher.dispatch({
        type: boardsActionTypes.SELECT_BOARD,
        board
    })
}
