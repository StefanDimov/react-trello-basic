import { EventEmitter } from 'events'

import dispatcher from '../dispatcher'
import { boardActionTypes } from '../actionTypes'

import listUtils from '../utils/listUtils'

class BoardStore extends EventEmitter {
    constructor() {
        super()
        this.board = {
            title: 'First Board',
            id: '1',
            lists: [
                {
                    boardId: '1',
                    id: '1',
                    title: 'Backlog',
                    cards: [{ id:'1', title: 'Develop app', description: 'Amazing' }, { id:'2', title: 'Test app' }]
                },
                {
                    boardId: '1',
                    id: '2',
                    title: 'ToDo',
                    cards: [{ id:'3', title: 'Learn Redux' }]
                },
                {
                    boardId: '1',
                    id: '3',
                    title: 'In Progress',
                    cards: [{ id:'4', title: 'Learn React' }, { id:'5', title: 'Try Flux' }]
                },
                {
                    boardId: '1',
                    id: '4',
                    title: 'Done',
                    cards: []
                }
            ]
        }
    }

    getBoard() {
        return this.board
    }

    handleActions(action) {
        switch (action.type) {
            case boardActionTypes.ADD_NEW_LIST:
                const newList = listUtils.createEmptyList(this.board.id)
                newList.title = action.listTitle
                this.board.lists.push(newList)
                this.emit('change')
        }
    }
}

const boardStore = new BoardStore()
dispatcher.register(boardStore.handleActions.bind(boardStore))

export default boardStore
