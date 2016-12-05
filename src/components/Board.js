import React from 'react'
import List from './List'
import ListsContainer from './ListsContainer'
import AddNewListInput from './AddNewListInput'
import { Navbar, Button } from 'react-bootstrap'

export default class Board extends React.Component {
    render() {
        const { title, lists, onCardClick, onCreateCardClick, onCreateNewList } = this.props

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
                </Navbar>

                <ListsContainer>
                    {listElements}
                    <AddNewListInput onCreateList={onCreateNewList} />
                </ListsContainer>
            </div>
        )
    }
}

const { string, array, func } = React.PropTypes
Board.propTypes = {
    title: string.isRequired,
    lists: array.isRequired,
    onCardClick: func.isRequired,
    onCreateCardClick: func.isRequired,
    onCreateNewList: func.isRequired
}
