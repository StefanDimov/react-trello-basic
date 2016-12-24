import React from 'react'
import { shallow } from 'enzyme'

import Card from '../../../src/views/components/Card'
import { Glyphicon } from 'react-bootstrap'

describe('Card', () => {

    const descriptionIcon = <Glyphicon glyph="align-left" />
    let card;

    beforeEach(() => {
        card = { listId: 'listId', id: 'uniqueId' }
    })

    it('sets the cards title', () => {
        card.title = 'title'
        const wrapper = shallow(<Card card={card}/>)
        expect(wrapper.find('span').first().text()).toBe(card.title)
    })

    it('should display icons on the right', () => {
        const wrapper = shallow(<Card card={card}/>)
        expect(wrapper.find('span').last().prop('className')).toBe('pull-right')
    })

    it('shows description icon when description is present', () => {
        card.description = 'description'
        const wrapper = shallow(<Card card={card}/>)
        expect(wrapper.contains(descriptionIcon)).toBe(true)
    })

    it('does not show description icon when description is not present', () => {
        card.description = undefined;
        const wrapper = shallow(<Card card={card}/>)
        expect(wrapper.contains(descriptionIcon)).toBe(false)
    })
})
