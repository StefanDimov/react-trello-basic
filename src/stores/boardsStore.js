import { EventEmitter } from 'events'
import R from 'ramda'

import dispatcher from '../dispatcher'
import dataStorage from '../storages/dataStorage'
// import { boardsActionTypes } from '../actionTypes'

class BoardsStore extends EventEmitter {
    constructor() {
        super()
    }

    getBoards() {
        return R.clone(dataStorage.getAllBoards())
    }

    handleActions(action) { // eslint-disable-line
        // switch (action) {
        // case boardsActionTypes.SELECT_BOARD:
        //
        //     break
        // }
    }
}

const boardsStore = new BoardsStore()
dispatcher.register(boardsStore.handleActions.bind(boardsStore))

export default boardsStore
