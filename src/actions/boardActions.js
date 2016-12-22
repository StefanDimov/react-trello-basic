import dispatcher from '../dispatcher'
import boardActionTypes from './boardActionTypes'

export function addNewList(listTitle) {
    dispatcher.dispatch({
        type: boardActionTypes.ADD_NEW_LIST,
        listTitle
    })
}
