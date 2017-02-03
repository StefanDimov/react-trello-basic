/** @module listUtils */
import React from 'react'
import { generate as generateId } from 'shortid'

/**
 * React propType for the board list
 * @type {object}
 */
export const listPropType = React.PropTypes.shape({
    boardId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    cards: React.PropTypes.array.isRequired
})

/**
 * Creates an empty list
 * @param  {string} boardId Id of the board the list belongs to
 * @return {object}         The created list
 */
export function createEmptyList(boardId){
    return {
        boardId: boardId || null,
        id: generateId(),
        title: '',
        cards: []
    }
}
