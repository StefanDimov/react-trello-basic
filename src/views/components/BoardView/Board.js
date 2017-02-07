import React from 'react'
import { Navbar, Nav, NavItem, Button, Glyphicon } from 'react-bootstrap'

import * as boardUtils from '../../../utils/boardUtils'
import CardList from './CardList'
import ListsWrapper from './ListsWrapper'
import AddNewListInput from './AddNewListInput'

/**
 * Component that visualizes a Board's lists and holds all the functionality regarding them.
 * @class comp/Board
 * @param {object} board The Board to be visualized
 * @param {function} onCardClick callback for when a card is clicked
 * @param {function} onCreateCard callback to which the data for a new card will be passed
 * @param {function} onCreateNewList callback to which the data for a new list will be passed
 * @param {function} onSaveBoard callback to which the data for updating a board will be passed
 */
export default class Board extends React.Component {
    render() { // eslint-disable-line
        const { board, onCardClick, onCreateCard, onCreateNewList, onSaveBoard } = this.props
        const { title, lists } = board

        const listElements = lists.map(list =>
            <CardList key={list.id} list={list} onCardClick={onCardClick}>
                <Button bsStyle="primary" block onClick={() => onCreateCard(list.id)}>Add Card</Button>
            </CardList>
        )

        return (
            <div className="my-navbar-top-padding">
                <Navbar fluid={true} fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>{title}</Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight={true}>
                        <NavItem onClick={() => { onSaveBoard(board) }}>
                            <Glyphicon glyph="floppy-disk" /> Save Board
                        </NavItem>
                        <NavItem href="/#">
                            <Glyphicon glyph="th-large" /> Boards
                        </NavItem>
                    </Nav>
                </Navbar>

                <ListsWrapper>
                    {listElements}
                    <AddNewListInput onCreateList={onCreateNewList} />
                </ListsWrapper>
            </div>
        )
    }
}

const { func } = React.PropTypes
Board.propTypes = {
    board: boardUtils.boardPropType.isRequired,
    onCardClick: func.isRequired,
    onCreateCard: func.isRequired,
    onCreateNewList: func.isRequired,
    onSaveBoard: func.isRequired
}
