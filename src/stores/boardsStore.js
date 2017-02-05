import { EventEmitter } from 'events'
import R from 'ramda'

import dispatcher from '../dispatcher'
import * as dataStorage from '../storages/dataStorage'
import * as boardUtils from '../utils/boardUtils'
import { boardsActionTypes } from '../actionTypes'

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
        switch (action.type) {

        case boardsActionTypes.ADD_NEW_BOARD:
            dataStorage.addBoard(boardUtils.createEmptyBoard(action.title))
            this.emit('change')
            break

        case boardsActionTypes.DELETE_BOARD:
            dataStorage.deleteBoard(action.board)
            this.emit('change')
            break
        }
    }
}

const boardsStore = new BoardsStore()
dispatcher.register(boardsStore._handleActions.bind(boardsStore))

export default boardsStore
