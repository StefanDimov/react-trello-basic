import * as dataStorage from '../../src/storages/dataStorage'
import boardsStore from '../../src/stores/boardsStore'

import { getEmptyBoard } from '../_mocks/Board.mocks'

describe('boardsStore', () => {

    let boards
    dataStorage.getAllBoards = jest.fn()

    beforeEach(() => {
        boards = [getEmptyBoard(1), getEmptyBoard(2)]
        dataStorage.getAllBoards.mockReset()
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
})
