import React from 'react'
import { generate as generateId } from 'shortid'

const cardUtils = {}

cardUtils.cardPropType = React.PropTypes.shape({
    listId: React.PropTypes.string,
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

export default cardUtils
