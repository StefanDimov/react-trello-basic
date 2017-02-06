/* eslint require-jsdoc: off */
import R from 'ramda'

import * as dataStorage from '../../src/storages/dataStorage'

import boardStore from '../../src/stores/boardStore'
import { boardActionTypes } from '../../src/actionTypes'

import { getBasicCard } from '../_mocks/Card.mocks'
import { getEmptyBoard, getBoardWithListsWithCards } from '../_mocks/Board.mocks'

describe('boardStore', () => {

    let emptyBoard, boardWithAListWithACard, card
    dataStorage.getBoard = jest.fn()
    boardStore.emit = jest.fn()

    beforeEach(() => {
        emptyBoard = getEmptyBoard()
        boardWithAListWithACard = getBoardWithListsWithCards({ numberOfLists: 1, numberOfCardsInLists: 1 })
        card = getBasicCard()

        dataStorage.getBoard.mockClear()
        boardStore.emit.mockClear()

        // reset boardStore state
        boardStore.isBoardLoaded = false
        boardStore.board = null
    })

    describe('getBoard', () => {
        it('should return a board', () => {
            loadBoardInStore(emptyBoard)
            const board = boardStore.getBoard()

            expect(board).toBeDefined()
            expect(typeof board).toBe('object')
        })

        it('should returned board should not be a reference to the private state', () => {
            loadBoardInStore(emptyBoard)
            const board = boardStore.getBoard()
            const boardSecond = boardStore.getBoard()

            expect(board).toMatchObject(boardSecond)
            expect(board).not.toBe(boardSecond)
        })
    })

    describe('_handleActions', () => {
        it('should load a board', () => {
            loadBoardInStore(emptyBoard)
            expect(boardStore.board).toBe(emptyBoard)
            expect(dataStorage.getBoard).toHaveBeenCalledTimes(1)
            expect(dataStorage.getBoard).toHaveBeenCalledWith(emptyBoard.id)

            // expect to emit change event after
            expect(boardStore.emit).toHaveBeenCalledTimes(1)
            expect(boardStore.emit).toHaveBeenCalledWith('change')
        })

        describe('add new list', () => {
            it('should add new list', () => {
                const listTitle = 'new list'
                loadBoardInStore(emptyBoard)
                boardStore._handleActions({ type: boardActionTypes.ADD_NEW_LIST, listTitle: listTitle })

                // expect list to be present
                const resultBoard = boardStore.getBoard()
                expect(R.find(R.propEq('title', listTitle), resultBoard.lists))
                    .toBeDefined()

                // expect to emit change event after
                expect(boardStore.emit).toHaveBeenCalledTimes(2)
                expect(boardStore.emit).toHaveBeenCalledWith('change')
            })

            it('should not throw error if board is not loaded', () => {
                expect(() => {
                    boardStore._handleActions({ type: boardActionTypes.ADD_NEW_LIST, listTitle: 'title' })
                }).not.toThrow()
            })
        })

        describe('save card', () => {
            it('should save a new card', () => {
                loadBoardInStore(boardWithAListWithACard)
                card.listId = boardWithAListWithACard.lists[0].id

                boardStore._handleActions({ type: boardActionTypes.SAVE_CARD, card: card })

                const resultBoard = boardStore.getBoard()
                expect(R.find(R.propEq('id', card.id), resultBoard.lists[0].cards))
                    .toBeDefined()

                // expect to emit change event after
                expect(boardStore.emit).toHaveBeenCalledTimes(2)
                expect(boardStore.emit).toHaveBeenCalledWith('change')
            })

            it('should save edits to a card', () => {
                loadBoardInStore(boardWithAListWithACard)
                let card = boardWithAListWithACard.lists[0].cards[0]

                // edit card
                let editedCard = R.clone(card)
                editedCard.title = 'new title'

                // perform add action
                boardStore._handleActions({ type: boardActionTypes.SAVE_CARD, card: editedCard })

                // expect a card to be added to list
                const resultBoard = boardStore.getBoard()
                const resultCard = resultBoard.lists[0].cards[0]

                // expect card to be updated
                expect(resultCard).toMatchObject(editedCard)
                expect(resultCard).not.toMatchObject(card)

                // expect to emit change event after
                expect(boardStore.emit).toHaveBeenCalledTimes(2)
                expect(boardStore.emit).toHaveBeenCalledWith('change')
            })

            it('should not throw error if board is not loaded', () => {
                expect(() => {
                    boardStore._handleActions({ type: boardActionTypes.SAVE_CARD, card: card })
                }).not.toThrow()
            })
        })

        describe('delete card', () => {
            it('should delete a card', () => {
                loadBoardInStore(boardWithAListWithACard)
                let card = boardWithAListWithACard.lists[0].cards[0]

                boardStore._handleActions({ type: boardActionTypes.DELETE_CARD, card: card })

                // expect a card to be removed from list
                const resultBoard = boardStore.getBoard()

                expect(resultBoard.lists[0].cards.length).toBe(0)

                // expect to emit change event after
                expect(boardStore.emit).toHaveBeenCalledTimes(2)
                expect(boardStore.emit).toHaveBeenCalledWith('change')
            })

            it('should not throw error if board is not loaded', () => {
                expect(() => {
                    boardStore._handleActions({ type: boardActionTypes.DELETE_CARD, card: card })
                }).not.toThrow()
            })
        })

        describe('copy card', () => {
            it('should copy a card', () => {
                loadBoardInStore(boardWithAListWithACard)
                let card = boardWithAListWithACard.lists[0].cards[0]

                boardStore._handleActions({ type: boardActionTypes.COPY_CARD, card: card })

                // expect to be two cards with the same data, but different ids
                const resultBoard = boardStore.getBoard()
                const resultFirstList = R.head(resultBoard.lists)
                const resultFirstCard = R.head(resultFirstList.cards)
                const resultLastCard = R.last(resultFirstList.cards)

                // first card should be the same as the one that initiated copy
                expect(resultFirstCard).toMatchObject(card)

                // first card id should be different that copied card
                expect(resultFirstCard.id).not.toEqual(resultLastCard.id)

                // first card title and description should be the same as the copied card
                expect(resultFirstCard.title).toEqual(resultLastCard.title)
                expect(resultFirstCard.description).toEqual(resultLastCard.description)

                // expect to emit change event after
                expect(boardStore.emit).toHaveBeenCalledTimes(2)
                expect(boardStore.emit).toHaveBeenCalledWith('change')
            })

            it('should not throw error if board is not loaded', () => {
                expect(() => {
                    boardStore._handleActions({ type: boardActionTypes.COPY_CARD, card: card })
                }).not.toThrow()
            })
        })
    })
})

function loadBoardInStore(board) {
    dataStorage.getBoard.mockReturnValue(board)
    boardStore._handleActions({ type: boardActionTypes.LOAD_BOARD, boardId: board.id })
}
