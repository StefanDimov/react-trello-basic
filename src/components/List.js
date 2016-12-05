import React from 'react'
import Card from './Card'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class List extends React.Component {
    render() {
        const { list, onCardClick, children} = this.props
        const { title, cards } = list

        const cardElements = cards.map(card =>
            <ListGroupItem onClick={() => onCardClick(card)} key={card.id}>
                <Card card={card}/>
            </ListGroupItem>
        )

        return (
            <Panel header={title} className="my-list">
                {(cardElements.length > 0) && <ListGroup>{cardElements}</ListGroup>}
                {children}
            </Panel>
        )
    }
}

const { object, array, func } = React.PropTypes
List.propTypes = {
    list: object.isRequired,
    onCardClick: func.isRequired
}
