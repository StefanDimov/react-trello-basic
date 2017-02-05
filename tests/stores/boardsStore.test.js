import * as dataStorage from '../../src/storages/dataStorage'
import boardsStore from '../../src/stores/boardsStore'
import { boardsActionTypes } from '../../src/actionTypes'

import { getEmptyBoard } from '../_mocks/Board.mocks'

describe('boardsStore', () => {

    let boards
    boardsStore.emit = jest.fn()
    dataStorage.getAllBoards = jest.fn()
    dataStorage.addBoard = jest.fn()
    dataStorage.deleteBoard = jest.fn()

    beforeEach(() => {
        boards = [getEmptyBoard(1), getEmptyBoard(2)]
        boardsStore.emit.mockReset()
        dataStorage.getAllBoards.mockReset()
        dataStorage.addBoard.mockReset()
        dataStorage.deleteBoard.mockReset()
    })

    describe('getBoards', () => {
        it('should return an array of boards', () => {
            dataStorage.getAllBoards.mockReturnValue(boards)
            expect(boardsStore.getBoards()).toMatchObject(boards)
        })

        it('should returned board should not be a reference to the private state', () => {
            dataStorage.getAllBoards.mockReturnValue(boards)

            const boardsFirst = boardsStore.getBoards()
            const boardsSecond = boardsStore.getBoards()

            expect(boardsFirst).toMatchObject(boardsSecond)
            expect(boardsFirst).not.toBe(boardsSecond)
        })
    })

    describe('_handleActions', () => {
        it('should add a new board to storage', () => {
            const title = 'boardTitle'
            boardsStore._handleActions({ type: boardsActionTypes.ADD_NEW_BOARD, title: title })

            expect(dataStorage.addBoard).toHaveBeenCalledTimes(1)
            expect(dataStorage.addBoard.mock.calls[0][0]).toMatchObject({ title: title, lists: [] })

            // expect to emit change event after
            expect(boardsStore.emit).toHaveBeenCalledTimes(1)
            expect(boardsStore.emit).toHaveBeenCalledWith('change')
        })

        it('should call storage to delete a board', () => {
            const board = getEmptyBoard()
            boardsStore._handleActions({ type: boardsActionTypes.DELETE_BOARD, board })

            expect(dataStorage.deleteBoard).toHaveBeenCalledTimes(1)
            expect(dataStorage.deleteBoard).toHaveBeenCalledWith(board)

            // expect to emit change event after
            expect(boardsStore.emit).toHaveBeenCalledTimes(1)
            expect(boardsStore.emit).toHaveBeenCalledWith('change')
        })
    })
})
