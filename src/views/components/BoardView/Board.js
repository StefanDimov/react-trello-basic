import React from 'react'
import { Navbar, Nav, NavItem, Button, Glyphicon } from 'react-bootstrap'

import boardUtils from '../../../utils/boardUtils'
import List from './List'
import ListsWrapper from './ListsWrapper'
import AddNewListInput from './AddNewListInput'


export default class Board extends React.Component {
    render() {
        const { board, onCardClick, onCreateCardClick, onCreateNewList } = this.props
        const { title, lists } = board

        const listElements = lists.map(list =>
            <List key={list.id} list={list} onCardClick={onCardClick}>
                <Button bsStyle="primary" block onClick={() => onCreateCardClick(list.id)}>Add Card</Button>
            </List>
        )

        return (
            <div className="my-navbar-top-padding">
                <Navbar fluid={true} fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>{title}</Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight={true}>
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
    onCreateCardClick: func.isRequired,
    onCreateNewList: func.isRequired
}
