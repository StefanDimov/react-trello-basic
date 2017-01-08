import React from 'react'
import Card from './Card'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

import listUtils from '../../../utils/listUtils'

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
            <Panel header={title} className="my-list-container-item">
                {(cardElements.length > 0) && <ListGroup>{cardElements}</ListGroup>}
                {children}
            </Panel>
        )
    }
}

List.propTypes = {
    list: listUtils.listPropType.isRequired,
    onCardClick: React.PropTypes.func.isRequired
}
