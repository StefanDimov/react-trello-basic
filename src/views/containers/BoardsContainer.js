import React from 'react'

import BoardsWrapper from '../components/BoardsView/BoardsWrapper'
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
        console.log(board) // eslint-disable-line
    }

    render() {
        return (
            <BoardsWrapper
                boards={this.state.boards}
                onBoardClick={this.selectBoard}/>
        )
    }
}
