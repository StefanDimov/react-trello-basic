import React from 'react'
import * as cardUtils from '../../../utils/cardUtils'
import { Glyphicon } from 'react-bootstrap'

/**
 * Component for visualizing a card title with some icons depending on the data it holds.
 * Ment to be used in CardList Component
 * @class comp/Card
 */
export default class Card extends React.Component {
    render() { // eslint-disable-line
        const { title, description } = this.props.card
        return (
            <div>
                <span>{title}</span>

                <span className="pull-right">
                    { description && <Glyphicon glyph="align-left" /> }
                </span>
            </div>
        )
    }
}

Card.propTypes = {
    card: cardUtils.cardPropType.isRequired
}
