import React from 'react'
import renderer from 'react-test-renderer'

import Card from '../../../src/views/components/Card'
import { Glyphicon } from 'react-bootstrap'

describe('Card', () => {

    const descriptionIcon = <Glyphicon glyph="align-left" />
    let card;

    beforeEach(() => {
        card = { listId: 'listId', id: 'uniqueId' }
    })

    it('should render correctly card with title', () => {
        card.title = 'title'
        const tree = renderer.create(<Card card={card}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('shows render description icon when description is present', () => {
        card.description = 'description'
        const tree = renderer.create(<Card card={card}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('should not render description icon when description is not present', () => {
        card.description = undefined;
        const tree = renderer.create(<Card card={card}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
