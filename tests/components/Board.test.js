import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Board from '../../src/components/Board'
import List from '../../src/components/List'
import AddNewListInput from '../../src/components/AddNewListInput'
import { Button } from 'react-bootstrap'

describe('Board', () => {

    let title, noLists, oneList, twoLists

    let onCardClick = jest.fn()
    let onCreateCardClick = jest.fn()
    let onCreateNewList = jest.fn()

    beforeEach(() => {
        title = 'boardTitle'
        noLists = []
        oneList = [{ id: 'uniqueId', title: 'listTitle', cards: [] }]
        twoLists = [{ id: 'uniqueId', title: 'listTitle', cards: [] }, { id: 'uniqueId2', title: 'listTitle2', cards: [] }]

        onCardClick.mockClear()
        onCreateCardClick.mockClear()
        onCreateNewList.mockClear()
    })

    describe('rendering', () => {
        it('should render properly with empty title and no lists', () => {
            const tree = renderer.create(
                <Board
                    title=''
                    lists={noLists}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            ).toJSON();

            expect(tree).toMatchSnapshot();
        })

        it('should render properly with a title and no lists', () => {
            const tree = renderer.create(
                <Board
                    title={title}
                    lists={noLists}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            ).toJSON();

            expect(tree).toMatchSnapshot();
        })

        it('should render properly with a title and a single list', () => {
            const tree = renderer.create(
                <Board
                    title={title}
                    lists={oneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            ).toJSON();

            expect(tree).toMatchSnapshot();
        })

        it('should render properly with a title and two lists', () => {
            const tree = renderer.create(
                <Board
                    title={title}
                    lists={twoLists}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            ).toJSON();

            expect(tree).toMatchSnapshot();
        })

    })

    describe('lists wrapper', () => {
        it('should have a AddNewListInput child with onCreateNewList passed to it', () => {
            const wrapper = shallow(
                <Board
                    title={title}
                    lists={oneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            )

            expect(wrapper.find(AddNewListInput).prop('onCreateList')).toBe(onCreateNewList)
        })
    })

    describe('lists', () => {
        it('should be passed onCardClick func', () => {
            const wrapper = shallow(
                <Board
                    title={title}
                    lists={oneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            )

            expect(wrapper.find(List).prop('onCardClick')).toBe(onCardClick)
        })

        it('should have a button child', () => {
            const wrapper = shallow(
                <Board
                    title={title}
                    lists={oneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            )

            expect(wrapper.find(List).find(Button).length).toBe(1)
        })

        it('should call onCreateCardClick with list id when the child button clicked', () => {
            const wrapper = shallow(
                <Board
                    title={title}
                    lists={oneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            )

            wrapper.find(List).find(Button).simulate('click')

            expect(onCreateCardClick.mock.calls.length).toBe(1)
            expect(onCreateCardClick.mock.calls[0][0]).toBe(oneList[0].id)
        })
    })
})
