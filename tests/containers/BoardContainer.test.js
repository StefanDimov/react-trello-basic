import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'


import BoardContainer from '../../src/containers/BoardContainer'
import Board from '../../src/components/Board'
import CardDetails from '../../src/components/CardDetails'
import { Modal } from 'react-bootstrap'

describe('BoardContainer', () => {

    let emptyBoard, boardWithTitle, boardWithTitleAndOneList, boardWithTitleAndTwoLists, card

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
        card = { id: 'uniqueId', title: 'cardTitle' }
    })

    describe('rendering', () => {

        it('should render correctly an empty board', () => {
            const tree = renderer.create(
                <BoardContainer board={emptyBoard}/>
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })

        it('should render correctly a board with a title', () => {
            const tree = renderer.create(
                <BoardContainer board={boardWithTitle}/>
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })

        it('should render correctly a board with a title and a list', () => {
            const tree = renderer.create(
                <BoardContainer board={boardWithTitleAndOneList}/>
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })

        it('should render correctly a board with a title and two lists', () => {
            const tree = renderer.create(
                <BoardContainer board={boardWithTitleAndTwoLists}/>
            ).toJSON()

            expect(tree).toMatchSnapshot();
        })
    })

    describe('card creation', () => {

        it('should open card creation modal with appropriate card and save function', () => {
            const wrapper = shallow(<BoardContainer board={emptyBoard} />)
            const instance = wrapper.instance()

            instance.viewCardDetails(card)

            expect(wrapper.find(Modal).prop('show')).toBe(true)
            expect(wrapper.find(Modal).find(CardDetails).length).toBe(1)
            expect(wrapper.find(Modal).find(CardDetails).prop('card')).toBe(card)
            expect(wrapper.find(Modal).find(CardDetails).prop('onCardSave')).toBe(instance.saveCard)
        })

        it('should hide card creation modal and clear the state', () => {
            const wrapper = shallow(<BoardContainer board={emptyBoard} />)
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
            const wrapper = shallow(<BoardContainer board={emptyBoard} />)
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
            const wrapper = shallow(<BoardContainer board={emptyBoard} />)
            const instance = wrapper.instance()

            expect(wrapper.find(Board).prop('onCardClick')).toBe(instance.viewCardDetails)
            expect(wrapper.find(Board).prop('onCreateCardClick')).toBe(instance.initCreateCard)
            expect(wrapper.find(Board).prop('onCreateNewList')).toBe(instance.createNewList)
        })
    })
})
