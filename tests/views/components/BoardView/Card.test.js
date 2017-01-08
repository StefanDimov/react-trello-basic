import React from 'react'
import renderer from 'react-test-renderer'

import Card from '../../../../src/views/components/BoardView/Card'
import { getCardOnlyWithIds } from '../../../_mocks/Card.mocks'

describe('Card', () => {

    let card

    beforeEach(() => {
        card = getCardOnlyWithIds()
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
        card.description = undefined
        const tree = renderer.create(<Card card={card}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
