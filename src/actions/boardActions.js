import dispatcher from '../dispatcher'
import { boardActionTypes } from '../actionTypes'

export function addNewList(listTitle) {
    dispatcher.dispatch({
        type: boardActionTypes.ADD_NEW_LIST,
        listTitle
    })
}

export function saveCard(card) {
    dispatcher.dispatch({
        type: boardActionTypes.SAVE_CARD,
        card
    })
}

export function deleteCard(card) {
    dispatcher.dispatch({
        type: boardActionTypes.DELETE_CARD,
        card: card
    })
}
