import React from 'react'
import { generate as generateId } from 'shortid'

const listUtils = {}

listUtils.listPropType = React.PropTypes.shape({
    boardId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    cards: React.PropTypes.array.isRequired
})

listUtils.createEmptyList = (boardId) => {
    return {
        boardId: boardId || null,
        id: generateId(),
        title: '',
        cards: []
    }
}

export default listUtils
