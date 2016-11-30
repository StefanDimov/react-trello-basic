import React from 'react'

export default class Card extends React.Component {
    render() {
        const { title } = this.props
        return (
            <div>{title}</div>
        )
    }
}

const { string } = React.PropTypes
Card.propTypes = {
    title: string.isRequired
}
