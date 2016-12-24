import { EventEmitter } from 'events'
import R from 'ramda'

import dispatcher from '../dispatcher'
import { boardActionTypes } from '../actionTypes'

import listUtils from '../utils/listUtils'

// TODO Fix mutations
// TODO Refactor `handleActions`

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
                    cards: [{ listId: '1', id:'1', title: 'Develop app', description: 'Amazing' }, { listId: '1', id:'2', title: 'Test app' }]
                },
                {
                    boardId: '1',
                    id: '2',
                    title: 'ToDo',
                    cards: [{ listId: '2', id:'3', title: 'Learn Redux' }]
                },
                {
                    boardId: '1',
                    id: '3',
                    title: 'In Progress',
                    cards: [{ listId: '3', id:'4', title: 'Learn React' }, { listId: '3', id:'5', title: 'Try Flux' }]
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

            case boardActionTypes.SAVE_CARD:
                const { card } = action

                console.log(card)

                const listToSaveCardTo = R.find(R.propEq('id', card.listId), this.board.lists)
                const cardInListIndex = R.findIndex(R.propEq('id', card.id), listToSaveCardTo.cards)

                // if it exists in list - update
                if (cardInListIndex !== -1) {
                    listToSaveCardTo.cards[cardInListIndex] = card
                } else {
                    // if new card - add to cards
                    listToSaveCardTo.cards.push(card)
                }
                this.emit('change')
        }
    }
}

const boardStore = new BoardStore()
dispatcher.register(boardStore.handleActions.bind(boardStore))

export default boardStore
