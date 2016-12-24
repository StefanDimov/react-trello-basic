import React from 'react'
import cardUtils from '../../utils/cardUtils'
import { Glyphicon } from 'react-bootstrap'

export default class Card extends React.Component {
    render() {
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
