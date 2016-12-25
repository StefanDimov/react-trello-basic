import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import CardDetails from '../../../src/views/components/CardDetails'
import { getCardOnlyWithIds } from '../../_mocks/Card.mocks'

describe('CardDetails', () => {

    const titleInputSelector = { id: 'card-details-title-input' }
    const titleDescriptionSelector = { id: 'card-details-description-input' }

    const event = { target: { value: 'some value' } }
    const onCardSave = jest.fn()
    let card

    beforeEach(() => {
        card = getCardOnlyWithIds()
        onCardSave.mockClear()
    })

    describe('rendering', () => {
        it('should render correctly when given empty card', () => {
            const tree = renderer.create(
                <CardDetails card={card} onCardSave={onCardSave} />
            ).toJSON();
            expect(tree).toMatchSnapshot();
        })

        it('should render correctly when given card with title', () => {
            card.title = 'title'
            const tree = renderer.create(
                <CardDetails card={card} onCardSave={onCardSave} />
            ).toJSON();
            expect(tree).toMatchSnapshot();
        })

        it('should render correctly when given card with description', () => {
            card.description = 'description'
            const tree = renderer.create(
                <CardDetails card={card} onCardSave={onCardSave} />
            ).toJSON();
            expect(tree).toMatchSnapshot();
        })

        it('should render correctly when given card with title and description', () => {
            card.title = 'title'
            card.description = 'description'
            const tree = renderer.create(
                <CardDetails card={card} onCardSave={onCardSave} />
            ).toJSON();
            expect(tree).toMatchSnapshot();
        })
    })

    describe('container', () => {
        it('should be a form element', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} />)
            expect(wrapper.is('form')).toBe(true)
        })

        it('should only preventDefault on submit', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} />)
            const event = { preventDefault: jest.fn() }
            wrapper.simulate('submit', event)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
            expect(onCardSave).toHaveBeenCalledTimes(0)
        })
    })

    describe('title input', () => {
        it('should update state on change', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} />)
            expect(wrapper.find(titleInputSelector).prop('value')).toBeUndefined()

            wrapper.find(titleInputSelector).simulate('change', event)
            expect(wrapper.find(titleInputSelector).prop('value')).toBe(event.target.value)
        })
    })

    describe('description input', () => {
        it('should update state on change', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} />)
            expect(wrapper.find(titleDescriptionSelector).prop('value')).toBeUndefined()

            wrapper.find(titleDescriptionSelector).simulate('change', event)
            expect(wrapper.find(titleDescriptionSelector).prop('value')).toBe(event.target.value)
        })
    })

    describe('card save logic', () => {
        it('should be called when components unmounts and card has changed', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} />)

            // must have a change so onCardSave will be called
            wrapper.find(titleInputSelector).simulate('change', event)
            // should'n te called before unmount
            expect(onCardSave).toHaveBeenCalledTimes(0)

            wrapper.unmount();
            expect(onCardSave).toHaveBeenCalledTimes(1)
        })

        it('should not be called if the card has not changed', () => {
            const wrapper = shallow(<CardDetails card={card} onCardSave={onCardSave} />)
            wrapper.unmount();
            expect(onCardSave).toHaveBeenCalledTimes(0)
        })
    })
})
