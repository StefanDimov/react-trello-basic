import React from 'react'

// import * as boardsActions from '../../actions/boardsActions'

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
        this.context.router.push('/board/' + board.id)
    }

    render() {
        return (
            <BoardsWrapper
                boards={this.state.boards}
                onBoardClick={this.selectBoard}/>
        )
    }
}

BoardsContainer.contextTypes = {
    router: React.PropTypes.object
}
