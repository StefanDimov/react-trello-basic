import React from 'react'
import Card from './Card'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class List extends React.Component {
    render() {
        const {title, cards, onCardClick, children} = this.props

        const cardElements = cards.map(card =>
            <ListGroupItem onClick={onCardClick} key={card.title}>
                <Card title={card.title}/>
            </ListGroupItem>
        )

        return (
            <Panel header={title}>
                {(cardElements.length > 0) && <ListGroup>{cardElements}</ListGroup>}
                {children}
            </Panel>
        )
    }
}

const { string, array, func } = React.PropTypes
List.propTypes = {
    title: string.isRequired,
    cards: array.isRequired,
    onCardClick: func.isRequired
}
