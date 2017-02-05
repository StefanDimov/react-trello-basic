import React from 'react'

import { Row, Col } from 'react-bootstrap'

import * as boardUtils from '../../../utils/boardUtils'
import BoardItem from './BoardItem'
import AddNewBoardInput from './AddNewBoardInput'

/**
 * Component that displays BoardItems. Has an input for adding a new board.
 * @class comp/BoardItemsList
 * @param {array} boards Boards to display
 * @param {function} onBoardClick callback for when a board is clicked
 * @param {function} onCreateBoard callback with the data to from the new board input
 * @param {function} onDeleteBoard callback which will be called when a board should be deleted
 */
export default class BoardItemsList extends React.Component {
    render() { // eslint-disable-line
        const { boards, onBoardClick, onCreateBoard, onDeleteBoard } = this.props
        return (
            <Row>
                {boards.map((board) =>
                    <Col sm={3} key={board.id} onClick={() => onBoardClick(board)}>
                        <BoardItem board={board} onDeleteBoard={onDeleteBoard} />
                    </Col>
                )}
                <Col sm={3} key={'add-new-boards-item'}>
                    <AddNewBoardInput onCreateBoard={onCreateBoard} />
                </Col>
            </Row>
        )
    }
}

BoardItemsList.propTypes = {
    boards: React.PropTypes.arrayOf(boardUtils.boardPropType).isRequired,
    onBoardClick: React.PropTypes.func.isRequired,
    onCreateBoard: React.PropTypes.func.isRequired,
    onDeleteBoard: React.PropTypes.func.isRequired
}
