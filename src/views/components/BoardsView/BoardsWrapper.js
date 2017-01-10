import React from 'react'

import { Navbar, Grid, Row, Col } from 'react-bootstrap'

import boardUtils from '../../../utils/boardUtils'

import BoardItemsList from './BoardItemsList'

export default class BoardsWrapper extends React.Component {
    render() {
        const { boards, onBoardClick, onCreateBoard } = this.props

        return (
            <div className="my-navbar-top-padding">
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
                    <BoardItemsList boards={boards} onBoardClick={onBoardClick} onCreateBoard={onCreateBoard} />
                </Grid>
            </div>
        )
    }
}

BoardsWrapper.propTypes = {
    boards: React.PropTypes.arrayOf(boardUtils.boardPropType).isRequired,
    onBoardClick: React.PropTypes.func.isRequired,
    onCreateBoard: React.PropTypes.func.isRequired
}
