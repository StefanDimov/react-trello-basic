import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import List from '../../../../src/views/components/BoardView/List'
import { ListGroupItem } from 'react-bootstrap'

import { getCardOnlyWithIds } from '../../../_mocks/Card.mocks'
import { getEmptyList } from '../../../_mocks/List.mocks'

describe('List', () => {

    const cardWithId = getCardOnlyWithIds(1)
    const anotherCardWithId = getCardOnlyWithIds(2)
    const onCardClick = jest.fn()
    let list

    beforeEach(() => {
        list = getEmptyList()
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
            expect(onCardClick).toHaveBeenLastCalledWith(cardWithId)

            wrapper.find(ListGroupItem).last().simulate('click')
            expect(onCardClick).toHaveBeenLastCalledWith(anotherCardWithId)
        })
    })
})
