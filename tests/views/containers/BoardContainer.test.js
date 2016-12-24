import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import boardStore from '../../../src/stores/boardStore'

import BoardContainer from '../../../src/views/containers/BoardContainer'
import Board from '../../../src/views/components/Board'
import CardDetails from '../../../src/views/components/CardDetails'
import { Modal } from 'react-bootstrap'

// TODO: Add missing tests - sub to store, getting data from store, actions

describe('BoardContainer', () => {

    let emptyBoard, boardWithTitle, boardWithTitleAndOneList, boardWithTitleAndTwoLists, card

    boardStore.getBoard = jest.fn()

    beforeEach(() => {
        emptyBoard = { id: 'uniqueId', title: '', lists: [] }
        boardWithTitle = { id: 'uniqueId', title: 'BoardTitle', lists: [] }
        boardWithTitleAndOneList = {
            id: 'uniqueId',
            title: 'BoardTitle',
            lists: [{ id: 'uniqueId', title: 'list', cards: [] }]
        }
        boardWithTitleAndTwoLists = {
            id: 'uniqueId',
            title: 'BoardTitle',
            lists: [
                { id: 'uniqueId', title: 'list', cards: [] },
                { id: 'uniqueId2', title: 'list2', cards: [] }
            ]
        }
        card = { listId: 'listId', id: 'uniqueId', title: 'cardTitle' }

        boardStore.getBoard.mockClear()
    })

    describe('rendering', () => {

        it('should render correctly an empty board', () => {

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

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndTwoLists)

            const tree = renderer.create(
                <BoardContainer />
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })
    })

    describe('card creation', () => {

        it('should open card creation modal with appropriate card and save function', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()

            instance.viewCardDetails(card)

            expect(wrapper.find(Modal).prop('show')).toBe(true)
            expect(wrapper.find(Modal).find(CardDetails).length).toBe(1)
            expect(wrapper.find(Modal).find(CardDetails).prop('card')).toBe(card)
            expect(wrapper.find(Modal).find(CardDetails).prop('onCardSave')).toBe(instance.saveCard)
        })

        it('should hide card creation modal and clear the state', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()

            instance.viewCardDetails(card)
            expect(wrapper.find(Modal).prop('show')).toBe(true)
            expect(wrapper.find(Modal).find(CardDetails).length).toBe(1)

            expect(wrapper.find(Modal).prop('onHide')).toBe(instance.closeCardDetailsModal)
            instance.closeCardDetailsModal()
            expect(wrapper.find(Modal).prop('show')).toBe(false)
            expect(wrapper.find(Modal).find(CardDetails).length).toBe(0)
        })

        it('should call card creation modal with empty card', () => {

            boardStore.getBoard.mockReturnValueOnce(boardWithTitleAndOneList)
            const wrapper = shallow(<BoardContainer />)
            const instance = wrapper.instance()
            const listId = 'someId'

            instance.initCreateCard(listId)
            expect(wrapper.find(Modal).prop('show')).toBe(true)
            expect(wrapper.find(Modal).find(CardDetails).length).toBe(1)

            expect(wrapper.find(Modal).prop('onHide')).toBe(instance.closeCardDetailsModal)
            expect(wrapper.find(Modal).find(CardDetails).prop('onCardSave')).toBe(instance.saveCard)
            expect(wrapper.find(Modal).find(CardDetails).prop('card').listId).toBe(listId)
            expect(wrapper.find(Modal).find(CardDetails).prop('card').title).toBe('')
            expect(wrapper.find(Modal).find(CardDetails).prop('card').description).toBe('')
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
    })
})
