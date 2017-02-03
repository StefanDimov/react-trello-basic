/** @module cardUtils */
import React from 'react'
import { generate as generateId } from 'shortid'
import R from 'ramda'

/**
 * React propType for the Card
 * @type {object}
 */
export const cardPropType = React.PropTypes.shape({
    listId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    description: React.PropTypes.string
})

/**
 * Creates an empty card
 * @param  {string} listId Id of the list the card belongs to
 * @return {object}        The created card
 */
export function createEmptyCard(listId) {
    return {
        listId: listId || null,
        id: generateId(),
        title: '',
        description: ''
    }
}

/**
 * Returns a copy of the card with a new random id
 * @param  {object} card Card to be copied
 * @return {object}      Copied card with new id
 */
export function changeCardId(card) {
    const resultCard = R.clone(card)
    resultCard.id = generateId()
    return resultCard
}
