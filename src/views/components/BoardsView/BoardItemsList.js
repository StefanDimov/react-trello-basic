import React from 'react'

import { Row, Col } from 'react-bootstrap'

import boardUtils from '../../../utils/boardUtils'
import BoardItem from './BoardItem'

export default class BoardItemsList extends React.Component {
    render() {
        const { boards, onBoardClick } = this.props
        return (
            <Row>
                {boards.map((board) =>
                    <Col sm={3} key={board.id} onClick={() => onBoardClick(board)}>
                        <BoardItem board={board} />
                    </Col>
                )}
            </Row>
        )
    }
}

BoardItemsList.propTypes = {
    boards: React.PropTypes.arrayOf(boardUtils.boardPropType).isRequired,
    onBoardClick: React.PropTypes.func.isRequired
}
