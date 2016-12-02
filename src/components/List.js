import React from 'react'
import Card from './Card'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class List extends React.Component {
    render() {
        const {title, cards} = this.props
        return (
            <Panel header={title}>
                <ListGroup>
                    {
                        cards.map(card =>
                            <ListGroupItem>
                                <Card key={card.title} title={card.title}/>
                            </ListGroupItem>
                        )
                    }
                </ListGroup>
            </Panel>
        )
    }
}

const { string, array } = React.PropTypes
List.propTypes = {
    title: string.isRequired,
    cards: array.isRequired
}
