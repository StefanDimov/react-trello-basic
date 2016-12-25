import React from 'react'
import { generate as generateId } from 'shortid'

const boardUtils = {}

boardUtils.boardPropType = React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    lists: React.PropTypes.array.isRequired
})

boardUtils.createEmptyBoard = () => {
    return {
        id: generateId(),
        title: '',
        lists: []
    }
}

export default boardUtils
