import React from 'react'
import * as boardUtils from '../../../utils/boardUtils'

/**
 * Component that represents a Board Item. Ment to be used with BoardItemsList Component
 * @class comp/BoardItem
 * @param {object} board - The Board data
 */
export default class BoardItem extends React.Component {
    render() { // eslint-disable-line
        const { board } = this.props
        return (
            <div className="my-board-item">
                { board.title }
            </div>
        )
    }
}

BoardItem.propTypes = {
    board: boardUtils.boardPropType
}
