import React from 'react'

import { Navbar, Grid, Row, Col } from 'react-bootstrap'

import * as boardUtils from '../../../utils/boardUtils'

import BoardItemsList from './BoardItemsList'

/**
 * Component that wrapps all the components and functionality of the Boards view.
 * @class comp/BoardsWrapper
 * @param {object} boards Boards to be visualized
 * @param {function} onBoardClick callback for when a board is clicked
 * @param {function} onCreateBoard callback in which data for creating a board will be passed
 */
export default class BoardsWrapper extends React.Component {
    render() { // eslint-disable-line
        const { boards, onBoardClick, onCreateBoard, onDeleteBoard } = this.props

        return (
            <div id="boardsView" className="my-navbar-top-padding">
                <Navbar fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>Boards</Navbar.Brand>
                    </Navbar.Header>
                </Navbar>

                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h2 className="h4">Choose a board...</h2>
                        </Col>
                    </Row>
                    <BoardItemsList boards={boards}
                        onBoardClick={onBoardClick}
                        onCreateBoard={onCreateBoard}
                        onDeleteBoard={onDeleteBoard} />
                </Grid>
            </div>
        )
    }
}

BoardsWrapper.propTypes = {
    boards: React.PropTypes.arrayOf(boardUtils.boardPropType).isRequired,
    onBoardClick: React.PropTypes.func.isRequired,
    onCreateBoard: React.PropTypes.func.isRequired,
    onDeleteBoard: React.PropTypes.func.isRequired
}
