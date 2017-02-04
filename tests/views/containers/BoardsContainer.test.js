import React from 'react'
import { shallow } from 'enzyme'

import { getEmptyBoard } from '../../_mocks/Board.mocks'

import boardsStore from '../../../src/stores/boardsStore'
import * as boardsActions from '../../../src/actions/boardsActions'

import BoardsContainer from '../../../src/views/containers/BoardsContainer'
import BoardsWrapper from '../../../src/views/components/BoardsView/BoardsWrapper'

describe('BoardsContainer', () => {

    let board
    boardsStore.on = jest.fn()
    boardsStore.removeListener = jest.fn()
    boardsStore.getBoards = jest.fn()
    boardsActions.addNewBoard = jest.fn()

    beforeEach(() => {
        board = getEmptyBoard()

        boardsStore.on.mockReset()
        boardsStore.removeListener.mockReset()

        boardsStore.getBoards.mockReset()
        boardsStore.getBoards.mockReturnValue([])

        boardsActions.addNewBoard.mockClear()
    })

    describe('boardsStore integration', () => {
        it('should get boards on mount', () => {
            shallow(<BoardsContainer />)
            expect(boardsStore.getBoards).toHaveBeenCalledTimes(1)
        })

        it('should subscibe to boardsStore on mount', () => {
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()


            expect(boardsStore.on).toHaveBeenCalledTimes(1)
            expect(boardsStore.on).toHaveBeenCalledWith('change', instance.setBoards)
        })

        it('should unsubscibe to boardsStore on unmount', () => {
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()

            wrapper.unmount()

            expect(boardsStore.removeListener).toHaveBeenCalledTimes(1)
            expect(boardsStore.removeListener).toHaveBeenCalledWith('change', instance.setBoards)
        })

        it('should update state on store change', () => {
            const wrapper = shallow(<BoardsContainer />)
            expect(boardsStore.getBoards).toHaveBeenCalledTimes(1)
            expect(wrapper.state().boards).toEqual([])

            const newBoardStoreData = [board]
            boardsStore.getBoards.mockReturnValue(newBoardStoreData)
            boardsStore.on.mock.calls[0][1]() // call passed handler

            expect(boardsStore.getBoards).toHaveBeenCalledTimes(2)
            expect(wrapper.state().boards).toEqual(newBoardStoreData)
        })
    })

    describe('BoardsWrapper', () => {
        it('should be passed proper props', () => {
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()

            expect(wrapper.find(BoardsWrapper).prop('onBoardClick'))
                .toBe(instance.selectBoard)
            expect(wrapper.find(BoardsWrapper).prop('onCreateBoard'))
                .toBe(instance.addNewBoard)
        })
    })

    describe('selectBoard', () => {
        it('should pass proper url to router context', () => {
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()

            instance.context = {
                router: { push: jest.fn() }
            }

            instance.selectBoard(board)

            expect(instance.context.router.push).toHaveBeenCalledTimes(1)
            expect(instance.context.router.push).toHaveBeenCalledWith('/board/' + board.id)
        })
    })

    describe('addNewBoard', () => {
        it('should call action with proper params', () => {
            const title = 'boardTitle'
            const wrapper = shallow(<BoardsContainer />)
            const instance = wrapper.instance()

            instance.addNewBoard(title)

            expect(boardsActions.addNewBoard).toHaveBeenCalledTimes(1)
            expect(boardsActions.addNewBoard).toHaveBeenCalledWith(title)
        })
    })
})
