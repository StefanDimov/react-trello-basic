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
            _createAndAddNewBoardToStorage(action.title)
            this.emit('change')
            break
        }
    }
}

/**
 * Creates a board with a given title and adds it to storage
 * @private
 * @param  {string} title The title that should be set on the new board
 */
function _createAndAddNewBoardToStorage(title) {
    const newBoard = boardUtils.createEmptyBoard(title)
    dataStorage.addBoard(newBoard)
}

const boardsStore = new BoardsStore()
dispatcher.register(boardsStore._handleActions.bind(boardsStore))

export default boardsStore
