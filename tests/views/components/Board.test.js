import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Board from '../../../src/views/components/Board'
import List from '../../../src/views/components/List'
import AddNewListInput from '../../../src/views/components/AddNewListInput'
import { Button } from 'react-bootstrap'

import { getEmptyBoard, getEmptyBoardWithLists } from '../../_mocks/Board.mocks'

describe('Board', () => {

    const onCardClick = jest.fn()
    const onCreateCardClick = jest.fn()
    const onCreateNewList = jest.fn()

    let boardWithTitle, boardWithTitleAndOneList, boardWithTitleAndTwoLists

    beforeEach(() => {
        boardWithTitle = getEmptyBoard()
        boardWithTitleAndOneList = getEmptyBoardWithLists(undefined, 1)
        boardWithTitleAndTwoLists = getEmptyBoardWithLists(undefined, 2)

        onCardClick.mockClear()
        onCreateCardClick.mockClear()
        onCreateNewList.mockClear()
    })

    describe('rendering', () => {
        it('should render properly with a title and no lists', () => {
            const tree = renderer.create(
                <Board
                    board={boardWithTitle}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render properly with a title and a single list', () => {
            const tree = renderer.create(
                <Board
                    board={boardWithTitleAndOneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            ).toJSON();

            expect(tree).toMatchSnapshot();
        })

        it('should render properly with a title and two lists', () => {
            const tree = renderer.create(
                <Board
                    board={boardWithTitleAndTwoLists}
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
                    board={boardWithTitleAndOneList}
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
                    board={boardWithTitleAndOneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            )

            expect(wrapper.find(List).prop('onCardClick')).toBe(onCardClick)
        })

        it('should have a button child', () => {
            const wrapper = shallow(
                <Board
                    board={boardWithTitleAndOneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            )

            expect(wrapper.find(List).find(Button).length).toBe(1)
        })

        it('should have a button that calls onCreateCardClick with list id', () => {
            const wrapper = shallow(
                <Board
                    board={boardWithTitleAndOneList}
                    onCardClick={onCardClick}
                    onCreateCardClick={onCreateCardClick}
                    onCreateNewList={onCreateNewList} />
            )

            wrapper.find(List).find(Button).simulate('click')

            expect(onCreateCardClick).toHaveBeenCalledTimes(1)
            expect(onCreateCardClick).toHaveBeenCalledWith(boardWithTitleAndOneList.lists[0].id)
        })
    })
})
