import { EventEmitter } from 'events'
import R from 'ramda'

import dispatcher from '../dispatcher'
import { boardActionTypes } from '../actionTypes'

import listUtils from '../utils/listUtils'
import cardUtils from '../utils/cardUtils'

// TODO: must get id from url path and get board data from local storage

function _getBoardWithNewList(board, listTitle) {
    const resultBoard = R.clone(board)

    const newList = listUtils.createEmptyList(resultBoard.id)
    newList.title = listTitle
    resultBoard.lists.push(newList)

    return resultBoard
}

function _getBoardWithSavedCard(board, card) {
    const resultBoard = R.clone(board)

    const listToSaveCardTo = R.find(R.propEq('id', card.listId), resultBoard.lists)
    const cardInListIndex = R.findIndex(R.propEq('id', card.id), listToSaveCardTo.cards)

    // if it exists in list - update
    if (cardInListIndex !== -1) {
        listToSaveCardTo.cards[cardInListIndex] = card
    } else {
        // if new card - add to cards
        listToSaveCardTo.cards.push(card)
    }

    return resultBoard
}

function _getBoardWithDeletedCard(board, card) {
    const resultBoard = R.clone(board)

    const listToRemoveCardFrom = R.find(R.propEq('id', card.listId), resultBoard.lists)
    const indexOfCardToRemove = R.findIndex(R.propEq('id', card.id), listToRemoveCardFrom.cards)
    listToRemoveCardFrom.cards.splice(indexOfCardToRemove, 1)

    return resultBoard
}

function _getBoardWithCopiedCard(board, card) {
    const resultBoard = R.clone(board)

    const list = R.find(R.propEq('id', card.listId), resultBoard.lists)
    list.cards.push(cardUtils.changeCardId(card))

    return resultBoard
}

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
        return R.clone(this.board)
    }

    handleActions(action) {
        switch (action.type) {
        case boardActionTypes.ADD_NEW_LIST:
            this.board = _getBoardWithNewList(this.board, action.listTitle)
            this.emit('change')
            break

        case boardActionTypes.SAVE_CARD:
            this.board = _getBoardWithSavedCard(this.board, action.card)
            this.emit('change')
            break

        case boardActionTypes.DELETE_CARD:
            this.board = _getBoardWithDeletedCard(this.board, action.card)
            this.emit('change')
            break

        case boardActionTypes.COPY_CARD:
            this.board = _getBoardWithCopiedCard(this.board, action.card)
            this.emit('change')
            break
        }
    }
}

const boardStore = new BoardStore()
dispatcher.register(boardStore.handleActions.bind(boardStore))

export default boardStore
