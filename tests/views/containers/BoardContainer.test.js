import React from 'react'
import { shallow } from 'enzyme'

import { getBasicCard } from '../../_mocks/Card.mocks'
import { getEmptyBoard, getBoardWithLists } from '../../_mocks/Board.mocks'

import * as boardActions from '../../../src/actions/boardActions'
import boardStore from '../../../src/stores/boardStore'
import BoardContainer from '../../../src/views/containers/BoardContainer'
import BoardModalWrapper from '../../../src/views/components/BoardView/BoardModalWrapper'

describe('BoardContainer', () => {

    const params = { boardId: 'boardId' }
    let boardWithTitle, boardWithTitleAndOneList, card

    boardActions.loadBoard = jest.fn()

    boardStore.getBoard = jest.fn()
    boardStore.on = jest.fn()

    beforeEach(() => {
        card = getBasicCard()
        boardWithTitle = getEmptyBoard()
        boardWithTitleAndOneList = getBoardWithLists({ numberOfLists: 1 })

        boardActions.loadBoard.mockClear()

        boardStore.on.mockClear()
        boardStore.getBoard.mockClear()
        boardStore.getBoard.mockReturnValue(boardWithTitleAndOneList)
    })

    describe('boardStore integration', () => {

        it('should subscribe to store on mount', () => {
            shallow(<BoardContainer params={params} />)
            expect(boardStore.on).toHaveBeenCalledTimes(1)
        })

        it('should call loadBoard action on mount', () => {
            shallow(<BoardContainer params={params} />)
            expect(boardActions.loadBoard).toHaveBeenCalledTimes(1)
        })

        it('should subscribe to store on unmount', () => {
            boardStore.removeListener = jest.fn()

            expect(boardStore.removeListener).toHaveBeenCalledTimes(0)
            const wrapper = shallow(<BoardContainer params={params} />)

            wrapper.unmount()
            expect(boardStore.removeListener).toHaveBeenCalledTimes(1)
            expect(boardStore.removeListener.mock.calls[0][0]).toBe(boardStore.on.mock.calls[0][0])
            expect(boardStore.removeListener.mock.calls[0][1]).toBe(boardStore.on.mock.calls[0][1])
        })

        it('should update state on store change', () => {
            const wrapper = shallow(<BoardContainer params={params} />)

            // manually trigger boardStore change event
            boardStore.on.mock.calls[0][1]()
            expect(boardStore.getBoard).toHaveBeenCalledTimes(1)
            expect(wrapper.state().board).toBe(boardWithTitleAndOneList)

            boardStore.getBoard.mockReturnValue(boardWithTitle)
            // manually trigger boardStore change event
            boardStore.on.mock.calls[0][1]()
            expect(boardStore.getBoard).toHaveBeenCalledTimes(2)
            expect(wrapper.state().board).toBe(boardWithTitle)
        })
    })

    describe('BoardModalWrapper', () => {
        it('should be passed proper props initialy', () => {
            const wrapper = shallow(<BoardContainer params={params} />)
            // manually trigger boardStore change event so board can be set to state
            boardStore.on.mock.calls[0][1]()

            const instance = wrapper.instance()
            const boardWrapper = wrapper.find(BoardModalWrapper)

            expect(boardWrapper.prop('board')).toBe(boardWithTitleAndOneList)
            expect(boardWrapper.prop('showCardDetails')).toBe(false)
            expect(wrapper.find(BoardModalWrapper).prop('cardToView')).toBe(null)

            expect(boardWrapper.prop('onCardClick')).toBe(instance.viewCardDetails)
            expect(boardWrapper.prop('onCreateCard')).toBe(instance.initCreateCard)
            expect(boardWrapper.prop('onCreateNewList')).toBe(instance.createNewList)
            expect(boardWrapper.prop('onHideCardDetails')).toBe(instance.closeCardDetailsModal)
            expect(boardWrapper.prop('onSaveCard')).toBe(instance.saveCard)
            expect(boardWrapper.prop('onDelteCard')).toBe(instance.deleteCard)
            expect(boardWrapper.prop('onCopyCard')).toBe(instance.copyCard)
        })

        it('should be passed proper props when viewCardDetails is called', () => {
            const wrapper = shallow(<BoardContainer params={params} />)
            // manually trigger boardStore change event so board can be set to state
            boardStore.on.mock.calls[0][1]()
            const instance = wrapper.instance()

            instance.viewCardDetails(card)

            const boardWrapper = wrapper.find(BoardModalWrapper)
            expect(boardWrapper.prop('showCardDetails')).toBe(true)
            expect(boardWrapper.prop('cardToView')).toBe(card)
        })

        it('should be passed proper props when closeCardDetailsModal is called after viewCardDetails', () => {
            const wrapper = shallow(<BoardContainer params={params} />)
            // manually trigger boardStore change event so board can be set to state
            boardStore.on.mock.calls[0][1]()
            const instance = wrapper.instance()

            instance.viewCardDetails(card)

            const boardWrapperOpened = wrapper.find(BoardModalWrapper)
            expect(boardWrapperOpened.prop('showCardDetails')).toBe(true)
            expect(boardWrapperOpened.prop('cardToView')).toBe(card)

            instance.closeCardDetailsModal(card)

            const boardWrapperClosed = wrapper.find(BoardModalWrapper)
            expect(boardWrapperClosed.prop('showCardDetails')).toBe(false)
            expect(boardWrapperClosed.prop('cardToView')).toBe(null)
        })

        it('should be passed proper props when initCreateCard is called', () => {
            const wrapper = shallow(<BoardContainer params={params} />)
            // manually trigger boardStore change event so board can be set to state
            boardStore.on.mock.calls[0][1]()
            const instance = wrapper.instance()
            const listId = 'listId'

            instance.initCreateCard(listId)

            const boardWrapper = wrapper.find(BoardModalWrapper)
            expect(boardWrapper.prop('showCardDetails')).toBe(true)
            expect(boardWrapper.prop('cardToView'))
                .toMatchObject({ listId: listId, title: '', description: '' })
        })
    })

    describe('Actions', () => {
        it('should call save card action with save funciton and not close modal', () => {
            boardActions.saveCard = jest.fn()

            const wrapper = shallow(<BoardContainer params={params} />)
            const instance = wrapper.instance()
            instance.closeCardDetailsModal = jest.fn()

            instance.saveCard(card)
            expect(boardActions.saveCard).toHaveBeenCalledTimes(1)
            expect(boardActions.saveCard).toHaveBeenCalledWith(card)
            expect(instance.closeCardDetailsModal).toHaveBeenCalledTimes(0)
        })

        it('should call delete card action with delete function and close modal', () => {
            boardActions.deleteCard = jest.fn()

            const wrapper = shallow(<BoardContainer params={params} />)
            const instance = wrapper.instance()
            instance.closeCardDetailsModal = jest.fn()

            instance.deleteCard(card)

            // expect delete card action to be called
            expect(boardActions.deleteCard).toHaveBeenCalledTimes(1)
            expect(boardActions.deleteCard).toHaveBeenCalledWith(card)

            // expect modal to be closed
            expect(instance.closeCardDetailsModal).toHaveBeenCalledTimes(1)
        })

        it('should call copy card action with copy function and close modal', () => {
            boardActions.copyCard = jest.fn()

            const wrapper = shallow(<BoardContainer params={params} />)
            const instance = wrapper.instance()
            instance.closeCardDetailsModal = jest.fn()

            const firstCardFromList = boardWithTitleAndOneList.lists[0].cards[0]

            instance.copyCard(firstCardFromList)

            // expect copy card action to be called
            expect(boardActions.copyCard).toHaveBeenCalledTimes(1)
            expect(boardActions.copyCard).toHaveBeenCalledWith(firstCardFromList)

            // expect modal to be closed
            expect(instance.closeCardDetailsModal).toHaveBeenCalledTimes(1)
        })

        it('should call add new list action with create list funciton', () => {
            boardActions.addNewList = jest.fn()

            const wrapper = shallow(<BoardContainer params={params} />)
            const instance = wrapper.instance()

            instance.createNewList(boardWithTitleAndOneList.lists[0].title)
            expect(boardActions.addNewList).toHaveBeenCalledTimes(1)
            expect(boardActions.addNewList).toHaveBeenCalledWith(boardWithTitleAndOneList.lists[0].title)
        })
    })
})
