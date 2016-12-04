import React from 'react'
import List from './List'
import { Navbar, Grid, Row, Col, Button } from 'react-bootstrap'

export default class Board extends React.Component {
    render() {
        const { title, lists, onCardClick, onCreateCardClick } = this.props

        const listElements = lists.map(list =>
            <Col key={list.title} sm={3}>
                <List title={list.title} cards={list.cards} onCardClick={onCardClick}>
                    <Button bsStyle="primary" block onClick={() => onCreateCardClick(list.id)}>Add Card</Button>
                </List>
            </Col>
        )

        return (
            <div>
                <Navbar fluid={true}>
                    <Navbar.Header>
                        <Navbar.Brand>{title}</Navbar.Brand>
                    </Navbar.Header>
                </Navbar>

                <Grid fluid={true}>
                    <Row>{listElements}</Row>
                </Grid>
            </div>
        )
    }
}

const { string, array, func } = React.PropTypes
Board.propTypes = {
    title: string.isRequired,
    lists: array.isRequired,
    onCardClick: func.isRequired,
    onCreateCardClick: func.isRequired
}
