import React from 'react'
import { generate as generateId } from 'shortid'
import R from 'ramda'

const cardUtils = {}

cardUtils.cardPropType = React.PropTypes.shape({
    listId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    description: React.PropTypes.string
})

cardUtils.createEmptyCard = (listId) => {
    return {
        listId: listId || null,
        id: generateId(),
        title: '',
        description: ''
    }
}

cardUtils.changeCardId = (card) => {
    const resultCard = R.clone(card)
    resultCard.id = generateId()
    return resultCard
}

export default cardUtils
