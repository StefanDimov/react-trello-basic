import React from 'react'
import cardUtils from '../utils/cardUtils'

export default class Card extends React.Component {
    render() {
        const { title } = this.props.card
        return (
            <div>{title}</div>
        )
    }
}

Card.propTypes = {
    card: cardUtils.cardPropType.isRequired
}
