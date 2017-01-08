import React from 'react'

import BoardItemsList from '../components/BoardItemsList'
import { getEmptyBoard } from '../../../tests/_mocks/Board.mocks.js'

export default class BoardsContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            boards: [getEmptyBoard(1), getEmptyBoard(2)]
        }

        this.selectBoard = this.selectBoard.bind(this)
    }

    selectBoard(board) {
        console.log(board)
    }

    render() {
        return (
            <BoardItemsList
                boards={this.state.boards}
                onBoardClick={this.selectBoard}/>
        )
    }
}
