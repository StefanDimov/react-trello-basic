import React from 'react'
import renderer from 'react-test-renderer'

import ListsWrapper from '../../../src/views/components/ListsWrapper'

describe('ListsWrapper', () => {

    it('should render correctly', () => {
        const tree = renderer.create(<ListsWrapper />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('should render correctly with children', () => {
        const tree = renderer.create(
            <ListsWrapper>
                <span>unique</span>
            </ListsWrapper>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
