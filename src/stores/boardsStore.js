import { EventEmitter } from 'events'
import R from 'ramda'

import dispatcher from '../dispatcher'
// import { boardsActionTypes } from '../actionTypes'

import { getEmptyBoard } from '../../tests/_mocks/Board.mocks.js'

class BoardsStore extends EventEmitter {
    constructor() {
        super()

        this.boards = [getEmptyBoard(1), getEmptyBoard(2)]
    }

    getBoards() {
        return R.clone(this.boards)
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
