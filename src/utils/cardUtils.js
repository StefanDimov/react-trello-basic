import React from 'react'
import { generate as generateId } from 'shortid'

const cardUtils = {}

cardUtils.cardPropType = React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    checklist: React.PropTypes.array
})

cardUtils.createEmptyCard = () => {
    return {
        id: generateId(),
        title: null,
        description: null,
        checklist: []
    }
}

export default cardUtils
