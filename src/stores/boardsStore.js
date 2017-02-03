import { EventEmitter } from 'events'
import R from 'ramda'

import dispatcher from '../dispatcher'
import * as dataStorage from '../storages/dataStorage'
// import { boardsActionTypes } from '../actionTypes'

/**
 * Store that manages all boards
 */
class BoardsStore extends EventEmitter {
    constructor() { // eslint-disable-line
        super()
    }

    /**
     * Returns all boards from storage
     * @return {array} All boards
     */
    getBoards() {
        return R.clone(dataStorage.getAllBoards())
    }

    /**
     * Callback for the dispatcher to handle actions
     * @param {object} action Action data to handle
     * @private
     */
    _handleActions(action) { // eslint-disable-line
        // switch (action) {
        // case boardsActionTypes.SELECT_BOARD:
        //
        //     break
        // }
    }
}

const boardsStore = new BoardsStore()
dispatcher.register(boardsStore._handleActions.bind(boardsStore))

export default boardsStore
