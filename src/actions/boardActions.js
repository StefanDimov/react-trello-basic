import dispatcher from '../dispatcher'
import { boardActionTypes } from '../actionTypes'

export function addNewList(listTitle) {
    dispatcher.dispatch({
        type: boardActionTypes.ADD_NEW_LIST,
        listTitle
    })
}
