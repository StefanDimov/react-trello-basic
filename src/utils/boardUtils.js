import React from 'react'
import { generate as generateId } from 'shortid'

const boardUtils = {}

boardUtils.boardPropType = React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    lists: React.PropTypes.array
})

boardUtils.createEmptyBoard = () => {
    return {
        id: generateId(),
        title: '',
        lists: []
    }
}

export default boardUtils
