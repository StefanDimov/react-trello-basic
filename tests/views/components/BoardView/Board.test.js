import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Board from '../../../../src/views/components/BoardView/Board'
import CardList from '../../../../src/views/components/BoardView/CardList'
import AddNewListInput from '../../../../src/views/components/BoardView/AddNewListInput'
import { Button } from 'react-bootstrap'

import { getEmptyBoard, getBoardWithLists } from '../../../_mocks/Board.mocks'

describe('Board', () => {

    const onCardClick = jest.fn()
    const onCreateCard = jest.fn()
    const onCreateNewList = jest.fn()

    let boardWithTitle, boardWithTitleAndOneList, boardWithTitleAndTwoLists

    beforeEach(() => {
        boardWithTitle = getEmptyBoard()
        boardWithTitleAndOneList = getBoardWithLists(undefined, 1)
        boardWithTitleAndTwoLists = getBoardWithLists(undefined, 2)

        onCardClick.mockClear()
        onCreateCard.mockClear()
        onCreateNewList.mockClear()
    })

    describe('rendering', () => {
        it('should render properly with a title and no lists', () => {
            const tree = renderer.create(
                <Board
                    board={boardWithTitle}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render properly with a title and a single list', () => {
            const tree = renderer.create(
                <Board
                    board={boardWithTitleAndOneList}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render properly with a title and two lists', () => {
            const tree = renderer.create(
                <Board
                    board={boardWithTitleAndTwoLists}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })

    describe('lists wrapper', () => {
        it('should have a AddNewListInput child with onCreateNewList passed to it', () => {
            const wrapper = shallow(
                <Board
                    board={boardWithTitleAndOneList}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList} />
            )

            expect(wrapper.find(AddNewListInput).prop('onCreateList')).toBe(onCreateNewList)
        })
    })

    describe('lists', () => {
        it('should be passed onCardClick func', () => {
            const wrapper = shallow(
                <Board
                    board={boardWithTitleAndOneList}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList} />
            )

            expect(wrapper.find(CardList).prop('onCardClick')).toBe(onCardClick)
        })

        it('should have a button that calls onCreateCard with list id', () => {
            const wrapper = shallow(
                <Board
                    board={boardWithTitleAndOneList}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList} />
            )

            wrapper.find(CardList).find(Button).simulate('click')

            expect(onCreateCard).toHaveBeenCalledTimes(1)
            expect(onCreateCard).toHaveBeenCalledWith(boardWithTitleAndOneList.lists[0].id)
        })
    })
})
