import R from 'ramda'

import boardStore from '../../src/stores/boardStore'
import { boardActionTypes } from '../../src/actionTypes'

import { getBasicCard } from '../_mocks/Card.mocks'
import { getBoardWithListsWithCards } from '../_mocks/Board.mocks'

describe('boardStore', () => {

    describe('getBoard', () => {

        it('should return a board', () => {
            const board = boardStore.getBoard()

            expect(board).toBeDefined()
            expect(typeof board).toBe('object')
        })

        it('should returned board should not be a reference to the private state', () => {
            const board = boardStore.getBoard()
            const boardSecond = boardStore.getBoard()

            expect(board).toMatchObject(boardSecond)
            expect(board).not.toBe(boardSecond)
        })
    })

    describe('handleActions', () => {

        let card
        boardStore.emit = jest.fn()

        beforeEach(() => {
            card = getBasicCard()
            boardStore.emit.mockClear()
        })

        it('should add new list', () => {
            const listTitle = 'new list'

            // expect list not to preset at first
            const initalBoard = boardStore.getBoard()
            expect(R.find(R.propEq('title', listTitle), initalBoard.lists))
                .toBeUndefined()

            // perform add list action
            boardStore.handleActions({ type: boardActionTypes.ADD_NEW_LIST, listTitle: listTitle })

            // expect list to be present
            const resultBoard = boardStore.getBoard()
            expect(R.find(R.propEq('title', listTitle), resultBoard.lists))
                .toBeDefined()

            // expect to emit change event after
            expect(boardStore.emit).toHaveBeenCalledTimes(1)
            expect(boardStore.emit).toHaveBeenCalledWith('change')
        })

        it('should save a new card', () => {
            // expect a card not to be there at first
            const initalBoard = boardStore.getBoard()
            const initialFirstList = R.head(initalBoard.lists)
            card.listId = initialFirstList.id
            expect(R.find(R.propEq('id', card.id), initialFirstList.cards))
                .toBeUndefined()

            // perform add action
            boardStore.handleActions({ type: boardActionTypes.SAVE_CARD, card: card })

            // expect a card to be added to list
            const resultBoard = boardStore.getBoard()
            const resultFirstList = R.head(resultBoard.lists)
            expect(R.find(R.propEq('id', card.id), resultFirstList.cards))
                .toBeDefined()

            // expect to emit change event after
            expect(boardStore.emit).toHaveBeenCalledTimes(1)
            expect(boardStore.emit).toHaveBeenCalledWith('change')
        })

        it('should save edits to a card', () => {
            // expect needed list and card to be defined
            const initalBoard = boardStore.getBoard()
            const initialFirstList = R.head(initalBoard.lists)
            const intialFirstCard = R.head(initialFirstList.cards)
            expect(initialFirstList).toBeDefined()
            expect(intialFirstCard).toBeDefined()

            // edit card
            let editedCard = R.clone(intialFirstCard)
            editedCard.title = 'new title'

            // perform add action
            boardStore.handleActions({ type: boardActionTypes.SAVE_CARD, card: editedCard })

            // expect a card to be added to list
            const resultBoard = boardStore.getBoard()
            const resultFirstList = R.head(resultBoard.lists)
            const resultFirstCard = R.head(resultFirstList.cards)

            // expect card to be updated
            expect(resultFirstCard).toMatchObject(editedCard)
            expect(resultFirstCard).not.toMatchObject(intialFirstCard)

            // expect to emit change event after
            expect(boardStore.emit).toHaveBeenCalledTimes(1)
            expect(boardStore.emit).toHaveBeenCalledWith('change')
        })

        it('should delete a card', () => {
            const initalBoard = boardStore.getBoard()
            const initialFirstList = R.head(initalBoard.lists)
            const intialFirstCard = R.head(initialFirstList.cards)
            expect(initialFirstList).toBeDefined()
            expect(intialFirstCard).toBeDefined()

            boardStore.handleActions({ type: boardActionTypes.DELETE_CARD, card: intialFirstCard })

            // expect a card to be removed from list
            const resultBoard = boardStore.getBoard()
            const resultFirstList = R.head(resultBoard.lists)
            const resultFirstCard = R.head(resultFirstList.cards)

            expect(resultFirstCard).not.toMatchObject(intialFirstCard)
            expect(resultFirstList.cards).not.toContainEqual(intialFirstCard)

            // expect to emit change event after
            expect(boardStore.emit).toHaveBeenCalledTimes(1)
            expect(boardStore.emit).toHaveBeenCalledWith('change')
        })
    })
})
