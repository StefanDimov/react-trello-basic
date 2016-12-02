import React from 'react'
import Board from '../components/Board'

export default class BoardContainer extends React.Component {
    constructor(props) {
        super(props)
        this.cardClickHandler = this.cardClickHandler.bind(this)
        this.createCardHandler = this.createCardHandler.bind(this)
    }
    cardClickHandler() {
        console.log('card clicked');
    }
    createCardHandler() {
        console.log('add card clicked')
    }
    render() {
        const { boardData } = this.props

        return <Board
                    title={boardData.title}
                    lists={boardData.lists}
                    onCardClick={this.cardClickHandler}
                    onCreateCardClick={this.createCardHandler} />
    }
}
