import React from 'react'

// import * as boardsActions from '../../actions/boardsActions'

import BoardsWrapper from '../components/BoardsView/BoardsWrapper'
import boardStore from '../../stores/boardsStore'

/**
 * Component that holds all the business logic for the Boards view.
 */
class BoardsContainer extends React.Component {
    constructor(props) { // eslint-disable-line
        super(props)

        this.state = {
            boards: boardStore.getBoards()
        }

        this.selectBoard = this.selectBoard.bind(this)
    }

    /**
     * Navigates to a given board view.
     * @param {object} board The board to which to navigate to
     */
    selectBoard(board) {
        this.context.router.push('/board/' + board.id)
    }

    /**
     * Calls boardAction to create a new board
     */
    createBoard() { // title
        // TODO: Implement Action
    }

    render() { // eslint-disable-line
        return (
            <BoardsWrapper
                boards={this.state.boards}
                onBoardClick={this.selectBoard}
                onCreateBoard={this.createBoard} />
        )
    }
}

BoardsContainer.contextTypes = {
    router: React.PropTypes.object
}

export default BoardsContainer
