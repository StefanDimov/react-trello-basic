/** @module boardUtils */
import React from 'react'
import { generate as generateId } from 'shortid'

/**
 * React propType for the Board
 * @type {object}
 */
export const boardPropType = React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    lists: React.PropTypes.array.isRequired
})

/**
 * Creates an empty card
 * @param {string} [title=''] The title of the board
 * @return {object} The created card
 */
export function createEmptyBoard(title='') {
    return {
        id: generateId(),
        title,
        lists: []
    }
}
