import React from 'react'
import renderer from 'react-test-renderer'

import { getEmptyBoard } from '../../_mocks/Board.mocks.js'

import BoardItem from '../../../src/views/components/BoardItem'

describe('BoardItem', () => {

    let board

    beforeEach(() => {
        board = getEmptyBoard()
    })

    describe('rendering', () => {
        it('should render correctly', () => {
            const tree = renderer.create(
                <BoardItem board={board} />
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})
