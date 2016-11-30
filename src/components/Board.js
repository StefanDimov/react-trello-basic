import React from 'react'
import List from './List'

export default class Board extends React.Component {
    render() {
        const { title, lists } = this.props
        return (
            <div>
                <h1>{title}</h1>
                <div>
                    { lists.map(list =>
                        <List
                            key={list.title}
                            title={list.title}
                            cards={list.cards} />)
                    }
                </div>
            </div>
        )
    }
}

const { string, array } = React.PropTypes
Board.propTypes = {
    title: string.isRequired,
    lists: array.isRequired
}
