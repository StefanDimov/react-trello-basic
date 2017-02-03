import React from 'react'
import Card from './Card'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

import * as listUtils from '../../../utils/listUtils'

/**
 * Component that visualizes a list of Card components
 * @class comp/CardList
 * @param {array} list list with the cards to visualize
 * @param {function} onCardClick callback to be called when a card is clicked
 */
export default class CardList extends React.Component {
    render() { // eslint-disable-line
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

CardList.propTypes = {
    list: listUtils.listPropType.isRequired,
    onCardClick: React.PropTypes.func.isRequired
}
