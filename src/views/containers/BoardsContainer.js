import React from 'react'

import * as boardsActions from '../../actions/boardsActions'

import BoardsWrapper from '../components/BoardsView/BoardsWrapper'
import boardsStore from '../../stores/boardsStore'

/**
 * Component that holds all the business logic for the Boards view.
 */
class BoardsContainer extends React.Component {
    constructor(props) { // eslint-disable-line
        super(props)

        this.state = {
            boards: boardsStore.getBoards()
        }

        this.selectBoard = this.selectBoard.bind(this)
        this.addNewBoard = this.addNewBoard.bind(this)
        this.setBoards = this.setBoards.bind(this)
    }

    /**
     * When component mounts, it will subscibe to boardsStore
     * @private
     */
    componentWillMount() {
        boardsStore.on('change', this.setBoards)
    }

    /**
     * When component unmounts, it will unsubscibe to boardsStore
     * @private
     */
    componentWillUnmount() {
        boardsStore.removeListener('change', this.setBoards)
    }

    /**
     * Gets boards data from boardsStore and set's it as state
     * @private
     */
    setBoards() {
        this.setState({ boards: boardsStore.getBoards() })
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
     * @param {string} title The title of the board to be created
     */
    addNewBoard(title) { // title
        boardsActions.addNewBoard(title)
    }

    render() { // eslint-disable-line
        return (
            <BoardsWrapper
                boards={this.state.boards}
                onBoardClick={this.selectBoard}
                onCreateBoard={this.addNewBoard} />
        )
    }
}

BoardsContainer.contextTypes = {
    router: React.PropTypes.object
}

export default BoardsContainer
