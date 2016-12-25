import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import List from '../../../src/views/components/List'
import Card from '../../../src/views/components/Card'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

describe('List', () => {

    let list
    let onCardClick = jest.fn()
    const cardWithId = { listId: '1', id: 'uniqueId' }
    const anotherCardWithId = { listId: '2', id: 'uniqueId2' }

    beforeEach(() => {
        list = { id: 'uniqueId', cards: [] }
        onCardClick.mockClear()
    })

    describe('rendering', () => {

        it('should render correctly with title', () => {
            list.title = 'title'
            const tree = renderer.create(
                <List list={list} onCardClick={onCardClick} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render correctly with children', () => {
            const tree = renderer.create(
                <List list={list} onCardClick={onCardClick}>
                    <span>unique</span>
                </List>
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render correctly with a card', () => {
            list.cards = [cardWithId]
            const tree = renderer.create(
                <List list={list} onCardClick={onCardClick} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render correctly with two card', () => {
            list.cards = [cardWithId, anotherCardWithId]
            const tree = renderer.create(
                <List list={list} onCardClick={onCardClick} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render correctly with no cards', () => {
            list.cards = []
            const tree = renderer.create(
                <List list={list} onCardClick={onCardClick} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })

    describe('cards', () => {

        it('should each be passed to the onCardClick func on ListGroupItem click', () => {
            list.cards = [cardWithId, anotherCardWithId]
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)

            wrapper.find(ListGroupItem).first().simulate('click')
            expect(onCardClick.mock.calls[0][0]).toBe(cardWithId)

            wrapper.find(ListGroupItem).last().simulate('click')
            expect(onCardClick.mock.calls[1][0]).toBe(anotherCardWithId)
        })
    })
})
