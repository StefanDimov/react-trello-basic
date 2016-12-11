import React from 'react'
import { shallow } from 'enzyme'

import ListsWrapper from '../../src/components/ListsWrapper'

describe('ListsWrapper', () => {

    it('should have the proper custom styles', () => {
        const wrapper = shallow(<ListsWrapper />)
        expect(wrapper.prop('className')).toBe('my-lists-container')
    })

    it('should render it\'s children', () => {
        const wrapper = shallow(
            <ListsWrapper>
                <span>unique</span>
            </ListsWrapper>
        )
        expect(wrapper.containsMatchingElement(<span>unique</span>)).toBe(true)
    })
})
