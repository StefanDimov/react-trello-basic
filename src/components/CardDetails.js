import React from 'react'
import cardUtils from '../utils/cardUtils'

export default class CardDetails extends React.Component {
    render() {
        const { card } = this.props

        return (
            <div>
                <h3>{ card.title }</h3>
                <p>{ card.description }</p>
            </div>
        )
    }
}

CardDetails.propTypes = {
    card: cardUtils.cardPropType.isRequired
}
