import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { Modal } from 'react-bootstrap'
import Board from '../../../../src/views/components/BoardView/Board'
import CardDetails from '../../../../src/views/components/BoardView/CardDetails'

import { getEmptyBoard, getBoardWithLists } from '../../../_mocks/Board.mocks'
import { getBasicCard } from '../../../_mocks/Card.mocks'

import BoardModalWrapper from '../../../../src/views/components/BoardView/BoardModalWrapper'

describe('BoardModalWrapper', () => {

    const onCardClick = jest.fn(),
        onCreateCard = jest.fn(),
        onCreateNewList = jest.fn(),
        onHideCardDetails = jest.fn(),
        onSaveCard = jest.fn(),
        onDelteCard = jest.fn(),
        onCopyCard = jest.fn()

    let emptyBoard, card, showCardDetails

    beforeEach(() => {
        emptyBoard = getEmptyBoard()
        card = null
        showCardDetails = false
    })

    describe('rendering', () => {
        it('should render correctly a board with a title', () => {
            const tree = renderer.create(
                <BoardModalWrapper
                    board={emptyBoard}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList}
                    showCardDetails={showCardDetails}
                    onHideCardDetails={onHideCardDetails}
                    onSaveCard={onSaveCard}
                    onDelteCard={onDelteCard}
                    onCopyCard={onCopyCard}
                    cardToView={card}/>
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render correctly a board with a title and a list', () => {
            const tree = renderer.create(
                <BoardModalWrapper
                    board={getBoardWithLists({ numberOfLists: 1 })}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList}
                    showCardDetails={showCardDetails}
                    onHideCardDetails={onHideCardDetails}
                    onSaveCard={onSaveCard}
                    onDelteCard={onDelteCard}
                    onCopyCard={onCopyCard}
                    cardToView={card}/>
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })

        it('should render correctly a board with a title and two lists', () => {
            const tree = renderer.create(
                <BoardModalWrapper
                    board={getBoardWithLists({ numberOfLists: 2 })}
                    onCardClick={onCardClick}
                    onCreateCard={onCreateCard}
                    onCreateNewList={onCreateNewList}
                    showCardDetails={showCardDetails}
                    onHideCardDetails={onHideCardDetails}
                    onSaveCard={onSaveCard}
                    onDelteCard={onDelteCard}
                    onCopyCard={onCopyCard}
                    cardToView={card}/>
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })

    describe('modal', () => {

        // NOTE: Modal can't be tested with snapshots because it's not renderer in the component markup but in the body

        it('should be passed proper props', () => {
            const wrapper = shallow(<BoardModalWrapper
                board={emptyBoard}
                onCardClick={onCardClick}
                onCreateCard={onCreateCard}
                onCreateNewList={onCreateNewList}
                showCardDetails={showCardDetails}
                onHideCardDetails={onHideCardDetails}
                onSaveCard={onSaveCard}
                onDelteCard={onDelteCard}
                onCopyCard={onCopyCard}
                cardToView={card}/>
            )

            expect(wrapper.find(Modal).prop('show')).toBe(showCardDetails)
            expect(wrapper.find(Modal).prop('onHide')).toBe(onHideCardDetails)
        })

        it('should contain a CardDetails with proper props when open', () => {

            showCardDetails = true
            card = getBasicCard()

            const wrapper = shallow(<BoardModalWrapper
                board={emptyBoard}
                onCardClick={onCardClick}
                onCreateCard={onCreateCard}
                onCreateNewList={onCreateNewList}
                showCardDetails={showCardDetails}
                onHideCardDetails={onHideCardDetails}
                onSaveCard={onSaveCard}
                onDelteCard={onDelteCard}
                onCopyCard={onCopyCard}
                cardToView={card}/>
            )

            expect(wrapper.find(Modal).prop('show')).toBe(showCardDetails)
            expect(wrapper.find(Modal).find(CardDetails)).toHaveLength(1)
            expect(wrapper.find(Modal).find(CardDetails).prop('card')).toBe(card)
            expect(wrapper.find(Modal).find(CardDetails).prop('onCardSave')).toBe(onSaveCard)
            expect(wrapper.find(Modal).find(CardDetails).prop('onCardDelete')).toBe(onDelteCard)
            expect(wrapper.find(Modal).find(CardDetails).prop('onCardCopy')).toBe(onCopyCard)
        })

        it('should not contain a CardDetails with proper props when closed', () => {
            const wrapper = shallow(<BoardModalWrapper
                board={emptyBoard}
                onCardClick={onCardClick}
                onCreateCard={onCreateCard}
                onCreateNewList={onCreateNewList}
                showCardDetails={showCardDetails}
                onHideCardDetails={onHideCardDetails}
                onSaveCard={onSaveCard}
                onDelteCard={onDelteCard}
                onCopyCard={onCopyCard}
                cardToView={card}/>
            )

            expect(wrapper.find(Modal).find(CardDetails)).toHaveLength(0)
        })
    })

    describe('board', () => {
        it('should be passed proper props', () => {
            const wrapper = shallow(<BoardModalWrapper
                board={emptyBoard}
                onCardClick={onCardClick}
                onCreateCard={onCreateCard}
                onCreateNewList={onCreateNewList}
                showCardDetails={showCardDetails}
                onHideCardDetails={onHideCardDetails}
                onSaveCard={onSaveCard}
                onDelteCard={onDelteCard}
                onCopyCard={onCopyCard}
                cardToView={card}/>
            )

            expect(wrapper.find(Board).prop('board')).toBe(emptyBoard)
            expect(wrapper.find(Board).prop('onCardClick')).toBe(onCardClick)
            expect(wrapper.find(Board).prop('onCreateCard')).toBe(onCreateCard)
            expect(wrapper.find(Board).prop('onCreateNewList')).toBe(onCreateNewList)
        })
    })
})
