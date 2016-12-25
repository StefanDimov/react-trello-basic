import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { getBasicCard } from '../../_mocks/Card.mocks'
import { getEmptyList } from '../../_mocks/List.mocks'

import boardStore from '../../../src/stores/boardStore'

import BoardContainer from '../../../src/views/containers/BoardContainer'
import Board from '../../../src/views/components/Board'
import CardDetails from '../../../src/views/components/CardDetails'
import { Modal } from 'react-bootstrap'
import * as boardActions from '../../../src/actions/boardActions'

describe('BoardContainer', () => {

    let boardWithTitle, boardWithTitleAndOneList

    boardStore.getBoard = jest.fn()

    beforeEach(() => {
        boardWithTitle = { id: 'uniqueId', title: 'BoardTitle', lists: [] }
        boardWithTitleAndOneList = {
            id: 'uniqueId',
            title: 'BoardTitle',
            lists: [getEmptyList()]
        }

        boardStore.getBoard.mockClear()
    })

    describe('rendering', () => {

        it('should render correctly an empty board', () => {

            const emptyBoard = { id: 'uniqueId', title: '', lists: [] }
            boardStore.getBoard.mockReturnValueOnce(emptyBoard)

            const tree = renderer.create(
                <BoardContainer />
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })

        it('should render correctly a board with a title', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitle)

            const tree = renderer.create(
                <BoardContainer />
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })

        it('should render correctly a board with a title and a list', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)

            const tree = renderer.create(
                <BoardContainer />
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })

        it('should render correctly a board with a title and two lists', () => {

            const boardWithTitleAndTwoLists = {
                id: 'uniqueId',
                title: 'BoardTitle',
                lists: [getEmptyList(1), getEmptyList(2)]
            }

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndTwoLists)

            const tree = renderer.create(
                <BoardContainer />
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })
    })

    describe('card creation', () => {

        let card

        beforeEach(() => {
            card = getBasicCard()
        })

        it('should open card creation modal with appropriate card and save function', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()

            instance.viewCardDetails(card)

            expect(wrapper.find(Modal).prop('show')).toBe(true)
            expect(wrapper.find(Modal).find(CardDetails)).toHaveLength(1)
            expect(wrapper.find(Modal).find(CardDetails).prop('card')).toBe(card)
            expect(wrapper.find(Modal).find(CardDetails).prop('onCardSave')).toBe(instance.saveCard)
        })

        it('should hide card creation modal and clear the state', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()

            instance.viewCardDetails(card)
            expect(wrapper.find(Modal).prop('show')).toBe(true)
            expect(wrapper.find(Modal).find(CardDetails)).toHaveLength(1)

            expect(wrapper.find(Modal).prop('onHide')).toBe(instance.closeCardDetailsModal)
            instance.closeCardDetailsModal()
            expect(wrapper.find(Modal).prop('show')).toBe(false)
            expect(wrapper.find(Modal).find(CardDetails)).toHaveLength(0)
        })

        it('should call card creation modal with empty card', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()
            const listId = 'someId'

            instance.initCreateCard(listId)
            expect(wrapper.find(Modal).prop('show')).toBe(true)
            expect(wrapper.find(Modal).find(CardDetails)).toHaveLength(1)

            expect(wrapper.find(Modal).prop('onHide')).toBe(instance.closeCardDetailsModal)
            expect(wrapper.find(Modal).find(CardDetails).prop('onCardSave')).toBe(instance.saveCard)
            expect(wrapper.find(Modal).find(CardDetails).prop('card'))
                .toMatchObject({ listId: listId, title: '', description: '' })
        })

        it('should call save card action with save funciton', () => {

            boardActions.saveCard = jest.fn()

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()

            instance.saveCard(card)
            expect(boardActions.saveCard).toHaveBeenCalledTimes(1)
            expect(boardActions.saveCard).toHaveBeenCalledWith(card)
        })
    })

    describe('Board', () => {
        it('should be passed the right functions', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()

            expect(wrapper.find(Board).prop('onCardClick')).toBe(instance.viewCardDetails)
            expect(wrapper.find(Board).prop('onCreateCardClick')).toBe(instance.initCreateCard)
            expect(wrapper.find(Board).prop('onCreateNewList')).toBe(instance.createNewList)
        })

        it('should call add new list action with create list funciton', () => {

            boardActions.addNewList = jest.fn()

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()

            instance.createNewList(boardWithTitleAndOneList.lists[0])
            expect(boardActions.addNewList).toHaveBeenCalledTimes(1)
            expect(boardActions.addNewList).toHaveBeenCalledWith(boardWithTitleAndOneList.lists[0])
        })
    })

    describe('boardStore integration', () => {

        boardStore.on = jest.fn()

        beforeEach(() => {
            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            boardStore.on.mockClear()
        })

        it('should get initial state from store', () => {
            expect(boardStore.getBoard).toHaveBeenCalledTimes(0)
            const wrapper = shallow(<BoardContainer />)
            expect(boardStore.getBoard).toHaveBeenCalledTimes(1)
        })

        it('should subscribe to store on mount', () => {
            expect(boardStore.on).toHaveBeenCalledTimes(0)
            const wrapper = shallow(<BoardContainer />)
            expect(boardStore.on).toHaveBeenCalledTimes(1)
        })

        it('should subscribe to store on unmount', () => {

            boardStore.unbindListener = jest.fn()

            expect(boardStore.unbindListener).toHaveBeenCalledTimes(0)
            const wrapper = shallow(<BoardContainer />)
            wrapper.unmount()
            expect(boardStore.unbindListener).toHaveBeenCalledTimes(1)
            expect(boardStore.unbindListener.mock.calls[0][0]).toBe(boardStore.on.mock.calls[0][0])
            expect(boardStore.unbindListener.mock.calls[0][1]).toBe(boardStore.on.mock.calls[0][1])
        })

        it('should update state on store change', () => {
            boardStore.getBoard.mockReturnValue(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            expect(boardStore.getBoard).toHaveBeenCalledTimes(1)
            expect(wrapper.state().board).toBe(boardWithTitleAndOneList)

            boardStore.getBoard.mockReturnValue(boardWithTitle)
            boardStore.on.mock.calls[0][1]() // call passed handler
            expect(boardStore.getBoard).toHaveBeenCalledTimes(2)
            expect(wrapper.state().board).toBe(boardWithTitle)
        })
    })
})
