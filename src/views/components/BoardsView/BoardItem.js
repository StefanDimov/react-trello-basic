import React from 'react'
import boardUtils from '../../../utils/boardUtils'

export default class BoardItem extends React.Component {
    render() {
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
