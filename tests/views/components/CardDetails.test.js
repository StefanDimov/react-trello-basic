import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import R from 'ramda'

import CardDetails from '../../../src/views/components/CardDetails'
import { getCardOnlyWithIds } from '../../_mocks/Card.mocks'

describe('CardDetails', () => {

    const titleInputSelector = { id: 'card-details-title-input' }
    const descriptionInputSelector = { id: 'card-details-description-input' }
    const copyButtonSelector = { id: 'card-copy-button' }
    const deleteButtonSelector = { id: 'card-delete-button' }

    const event = { target: { value: 'some value' } }
    const onCardSave = jest.fn()
    const onCardDelete = jest.fn()
    const onCardCopy = jest.fn()
    let card

    beforeEach(() => {
        card = getCardOnlyWithIds()
        onCardSave.mockClear()
        onCardDelete.mockClear()
        onCardCopy.mockClear()
    })

    describe('rendering', () => {
        it('should render correctly when given empty card', () => {
            const tree = renderer.create(
                <CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />
            ).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it('should render correctly when given card with title', () => {
            card.title = 'title'
            const tree = renderer.create(
                <CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />
            ).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it('should render correctly when given card with description', () => {
            card.description = 'description'
            const tree = renderer.create(
                <CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />
            ).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it('should render correctly when given card with title and description', () => {
            card.title = 'title'
            card.description = 'description'
            const tree = renderer.create(
                <CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />
            ).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

    describe('form', () => {
        it('should only preventDefault on submit', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />)
            const event = { preventDefault: jest.fn() }

            wrapper.find('form').simulate('submit', event)

            expect(event.preventDefault).toHaveBeenCalledTimes(1)
            expect(onCardSave).toHaveBeenCalledTimes(0)
        })
    })

    describe('title input', () => {
        it('should update state on change', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />)
            wrapper.find(titleInputSelector).simulate('change', event)
            expect(wrapper.find(titleInputSelector).prop('value')).toBe(event.target.value)
        })
    })

    describe('description input', () => {
        it('should update state on change', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />)
            wrapper.find(descriptionInputSelector).simulate('change', event)
            expect(wrapper.find(descriptionInputSelector).prop('value')).toBe(event.target.value)
        })
    })

    describe('card save logic', () => {
        it('should be called when components unmounts and card has changed', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />)

            // must have a change so onCardSave will be called
            wrapper.find(titleInputSelector).simulate('change', event)
            // should'n be called before unmount
            expect(onCardSave).toHaveBeenCalledTimes(0)

            wrapper.unmount()
            expect(onCardSave).toHaveBeenCalledTimes(1)
        })

        it('should not be called if the card has not changed', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />)
            wrapper.unmount()
            expect(onCardSave).toHaveBeenCalledTimes(0)
        })
    })

    describe('action buttons', () => {

        it('delete button should properly call onCardDelete function when card', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />)
            wrapper.find(deleteButtonSelector).simulate('click')
            expect(onCardDelete).toHaveBeenCalledTimes(1)
            expect(onCardDelete).toHaveBeenCalledWith(card)
        })

        it('copy button should properly call onCardCopy function when card has not been edited', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />)
            wrapper.find(copyButtonSelector).simulate('click')
            expect(onCardCopy).toHaveBeenCalledTimes(1)
            expect(onCardCopy).toHaveBeenCalledWith(card)
        })

        it('copy button should properly call onCardCopy function when card has been edited', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} onCardCopy={onCardCopy} onCardDelete={onCardDelete} />)

            // change title
            wrapper.find(titleInputSelector).simulate('change', event)
            // copy button click
            wrapper.find(copyButtonSelector).simulate('click')

            const expectedCard = R.clone(card)
            expectedCard.title = event.target.value

            expect(onCardCopy).toHaveBeenCalledTimes(1)
            expect(onCardCopy).toHaveBeenCalledWith(expectedCard)
        })
    })
})
