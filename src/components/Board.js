import React from 'react'
import List from './List'
import { Navbar, Grid, Row, Col } from 'react-bootstrap'

export default class Board extends React.Component {
    render() {
        const { title, lists } = this.props
        return (
            <div>
                <Navbar fluid={true}>
                    <Navbar.Header>
                        <Navbar.Brand>{title}</Navbar.Brand>
                    </Navbar.Header>
                </Navbar>

                <Grid fluid={true}>
                    <Row>
                        {lists.map(list =>
                            <Col sm={3}>
                                <List key={list.title} title={list.title} cards={list.cards} />
                            </Col>
                        )}
                    </Row>
                </Grid>
            </div>
        )
    }
}

const { string, array } = React.PropTypes
Board.propTypes = {
    title: string.isRequired,
    lists: array.isRequired
}
