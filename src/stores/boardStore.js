import { EventEmitter } from 'events'
import R from 'ramda'

import dispatcher from '../dispatcher'
import { boardActionTypes } from '../actionTypes'

import * as listUtils from '../utils/listUtils'
import * as cardUtils from '../utils/cardUtils'

// TODO: must get id from url path and get board data from local storage

/**
 * Store that manages a certain loaded board
 */
class BoardStore extends EventEmitter {
    constructor() { // eslint-disable-line
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

    /**
     * Returns the board
     * @return {object} The board
     */
    getBoard() {
        return R.clone(this.board)
    }

    /**
     * Callback for the dispatcher to handle actions
     * @param {object} action Action data to handle
     * @private
     */
    _handleActions(action) {
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
dispatcher.register(boardStore._handleActions.bind(boardStore))

export default boardStore

/**
 * Returns a copy of the board with added new list
 * @private
 * @param  {object} board     Board to copy and return
 * @param  {string} listTitle Title of the list to add
 * @return {object}           Copy of the board with the new list
 */
function _getBoardWithNewList(board, listTitle) {
    const resultBoard = R.clone(board)

    const newList = listUtils.createEmptyList(resultBoard.id)
    newList.title = listTitle
    resultBoard.lists.push(newList)

    return resultBoard
}

/**
 * Returns a copy of the board with updated or newly addded card
 * @private
 * @param  {object} board Board to copy and return
 * @param  {object} card  Card to update or save
 * @return {object}       Copy of the board with the new card
 */
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

/**
 * Returns a copy of the board without a certain card
 * @private
 * @param  {object} board Board to copy and return
 * @param  {object} card  Card to delete
 * @return {object}       Copy of the board with the new card
 */
function _getBoardWithDeletedCard(board, card) {
    const resultBoard = R.clone(board)

    const listToRemoveCardFrom = R.find(R.propEq('id', card.listId), resultBoard.lists)
    const indexOfCardToRemove = R.findIndex(R.propEq('id', card.id), listToRemoveCardFrom.cards)
    listToRemoveCardFrom.cards.splice(indexOfCardToRemove, 1)

    return resultBoard
}

/**
 * Returns a copy of the board with a copied card
 * @private
 * @param  {object} board Board to copy and return
 * @param  {object} card  Card to copy
 * @return {object}       Copy of the board with the copied card
 */
function _getBoardWithCopiedCard(board, card) {
    const resultBoard = R.clone(board)

    const list = R.find(R.propEq('id', card.listId), resultBoard.lists)
    list.cards.push(cardUtils.changeCardId(card))

    return resultBoard
}
