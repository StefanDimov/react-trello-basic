import React from 'react'
import { shallow } from 'enzyme'

import List from '../../src/components/List'
import Card from '../../src/components/Card'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

describe('List', () => {

    let list
    let onCardClick = jest.fn()

    beforeEach(() => {
        list = { id: 'uniqueId', cards: [] }
        onCardClick.mockClear()
    })

    describe('container', () => {

        it('should be bootstrap panel', () => {
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)
            expect(wrapper.is(Panel)).toBe(true)
        })

        it('should have title set on bootstrap panel', () => {
            list.title = 'title'
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)
            expect(wrapper.prop('header')).toBe(list.title)
        })

        it('should have proper custom styles', () => {
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)
            expect(wrapper.prop('className')).toBe('my-list-container-item')
        })

        it('should render children', () => {
            const wrapper = shallow(
                <List list={list} onCardClick={onCardClick}>
                    <span>unique</span>
                </List>
            )
            expect(wrapper.containsMatchingElement(<span>unique</span>)).toBe(true)
        })
    })

    describe('cards', () => {

        const cardWithId = {id: 'uniqueId'}
        const anotherCardWithId = {id: 'uniqueId2'}

        it('should have a ListGroup container', () => {
            list.cards = [cardWithId]
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)
            expect(wrapper.children(ListGroup).length).toBe(1)
            expect(wrapper.children(ListGroup).find(Card).length).toBe(1)
        })

        it('should not have a rendered ListGroup container if there are no cards', () => {
            list.cards = []
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)
            expect(wrapper.children(ListGroup).length).toBe(0)
            expect(wrapper.find(Card).length).toBe(0)
        })

        it('should each be wrapped in a ListGroupItem container', () => {
            list.cards = [cardWithId]
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)
            expect(wrapper.children(ListGroup).children(ListGroupItem).length).toBe(1)
            expect(wrapper.children(ListGroup).children(ListGroupItem).children(Card).length).toBe(1)
        })

        it('should each have their ids set on ListGroupItem as a key prop', () => {
            list.cards = [cardWithId, anotherCardWithId]
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)

            expect(wrapper.find(ListGroupItem).first().key()).toBe(cardWithId.id)
            expect(wrapper.find(ListGroupItem).last().key()).toBe(anotherCardWithId.id)
        })

        it('should each be passed to the onCardClick func on ListGroupItem click', () => {
            list.cards = [cardWithId, anotherCardWithId]
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)

            wrapper.find(ListGroupItem).first().simulate('click')
            expect(onCardClick.mock.calls[0][0]).toBe(cardWithId)

            wrapper.find(ListGroupItem).last().simulate('click')
            expect(onCardClick.mock.calls[1][0]).toBe(anotherCardWithId)
        })

        it('should each be passed the card data to it', () => {
            list.cards = [cardWithId, anotherCardWithId]
            const wrapper = shallow(<List list={list} onCardClick={onCardClick} />)

            expect(wrapper.find(Card).first().prop('card')).toBe(cardWithId)
            expect(wrapper.find(Card).last().prop('card')).toBe(anotherCardWithId)
        })
    })
})
