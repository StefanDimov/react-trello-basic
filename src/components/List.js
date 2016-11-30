import React from 'react'
import Card from './Card'

export default class List extends React.Component {
    render() {
        const {title, cards} = this.props
        return (
            <div>
                <h2>{title}</h2>
                <div>
                    {cards.map(card =>
                        <Card
                            key={card.title}
                            title={card.title}/>)
                    }
                </div>
            </div>
        )
    }
}

const { string, array } = React.PropTypes
List.propTypes = {
    title: string.isRequired,
    cards: array.isRequired
}
