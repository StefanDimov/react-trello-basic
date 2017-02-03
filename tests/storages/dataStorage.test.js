import R from 'ramda'
import Lockr from 'lockr'

import { getEmptyBoard } from '../_mocks/Board.mocks'
import { LOCAL_STORAGE_DATA_KEY } from '../../src/config'

import * as dataStorage from '../../src/storages/dataStorage'

describe('dataStorage', () => {

    let board, twoBoards
    Lockr.get = jest.fn()
    Lockr.set = jest.fn()

    beforeEach(() => {
        board = getEmptyBoard(1)
        twoBoards = [getEmptyBoard(2), getEmptyBoard(3)]

        Lockr.get.mockReset()
        Lockr.set.mockReset()
    })

    describe('getAllBoards', () => {
        it('should return correct value', () => {
            Lockr.get.mockReturnValue(twoBoards)
            const resultBoards = dataStorage.getAllBoards()

            expect(resultBoards).toBe(twoBoards)
            expect(Lockr.get).toHaveBeenCalledTimes(1)
            expect(Lockr.get).toHaveBeenCalledWith(LOCAL_STORAGE_DATA_KEY, [])
        })
    })

    describe('getBoard', () => {
        it('should return correct value', () => {
            Lockr.get.mockReturnValue(twoBoards)
            const resultBoard = dataStorage.getBoard(twoBoards[0].id)
            expect(resultBoard).toBe(twoBoards[0])
        })
    })

    describe('addBoard', () => {
        it('should correctly add board when the storage is empty', () => {
            Lockr.get.mockReturnValue([])
            dataStorage.addBoard(board)
            expect(Lockr.set).toHaveBeenCalledTimes(1)
            expect(Lockr.set).toHaveBeenCalledWith(LOCAL_STORAGE_DATA_KEY, [board])
        })

        it('should correctly add board when the storage has multiple boards', () => {
            Lockr.get.mockReturnValue(twoBoards)
            dataStorage.addBoard(board)
            expect(Lockr.set).toHaveBeenCalledTimes(1)
            expect(Lockr.set).toHaveBeenCalledWith(LOCAL_STORAGE_DATA_KEY, R.append(board, twoBoards))
        })
    })

    describe('updateBoard', () => {
        it('should correctly update board is the only board in storage', () => {
            Lockr.get.mockReturnValue([board])
            const modifiedBoard = R.clone(board)
            modifiedBoard.title = 'new title'

            dataStorage.updateBoard(modifiedBoard)

            expect(Lockr.set).toHaveBeenCalledTimes(1)
            expect(Lockr.set).toHaveBeenCalledWith(LOCAL_STORAGE_DATA_KEY, [modifiedBoard])
        })

        it('should correctly update the board when the storage has multiple boards', () => {
            Lockr.get.mockReturnValue(twoBoards)
            const modifiedBoard = R.clone(twoBoards[0])
            modifiedBoard.title = 'new title'

            dataStorage.updateBoard(modifiedBoard)

            expect(Lockr.set).toHaveBeenCalledTimes(1)
            expect(Lockr.set).toHaveBeenCalledWith(LOCAL_STORAGE_DATA_KEY, [modifiedBoard, twoBoards[1]])
        })
    })
})
