import React from 'react'

import * as cardUtils from '../../utils/cardUtils'

import boardStore from '../../stores/boardStore'
import * as boardActions from '../../actions/boardActions'

import BoardModalWrapper from '../components/BoardView/BoardModalWrapper'

/**
 * Component that holds all the business logic for the Board view.
 * Visualing and managing the board's list, cards.
 */
class BoardContainer extends React.Component {
    /**
     * The constructor for the Container
     * @param {object} props React props object
     * @param {string} props.params.boardId The board id in the url passed from react router
     */
    constructor(props) {
        super(props)

        this.setBoard = this.setBoard.bind(this)
        this.viewCardDetails = this.viewCardDetails.bind(this)
        this.initCreateCard = this.initCreateCard.bind(this)
        this.saveCard = this.saveCard.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
        this.copyCard = this.copyCard.bind(this)
        this.closeCardDetailsModal = this.closeCardDetailsModal.bind(this)
        this.createNewList = this.createNewList.bind(this)

        this.state = {
            board: null,
            showCardDetails: false,
            cardToView: null
        }
    }

    /**
     * When component mounts, it will subscibe to boardStore
     * @private
     */
    componentWillMount() {
        boardStore.on('change', this.setBoard)
        boardActions.loadBoard(this.props.params.boardId)
    }

    /**
     * When component unmounts, it will unsubscibe to boardStore
     * @private
     */
    componentWillUnmount() {
        boardStore.removeListener('change', this.setBoard)
    }

    /**
     * Gets board from boardStore and set's it as state
     */
    setBoard() {
        this.setState({ board: boardStore.getBoard() })
    }

    /**
     * Opens CardDetails Modal with a certain card.
     * @param {object} card The card to be used in the CardDetails Modal
     */
    viewCardDetails(card) {
        this.setState({
            showCardDetails: true,
            cardToView: card
        })
    }

    /**
     * Closes CardDetails Modal and clears state
     */
    closeCardDetailsModal() {
        this.setState({
            showCardDetails: false,
            cardToView: null
        })
    }

    /**
     * Opens CardDetails Modal with new empty card
     * @param {string} listId The listId to be set on the new card
     */
    initCreateCard(listId) {
        this.setState({
            showCardDetails: true,
            cardToView: cardUtils.createEmptyCard(listId)
        })
    }

    /**
     * Calls boardAction to creat a new list
     * @param {string} listName The name of the list that should be created
     */
    createNewList(listName) {
        boardActions.addNewList(listName)
    }

    /**
     * Calls boardAction to save a card
     * @param {object} card The card that needs to be saved
     */
    saveCard(card) {
        boardActions.saveCard(card)
    }

    /**
     * Calls boardAction to delete a card
     * @param {object} card The card that needs to be deleted
     */
    deleteCard(card) {
        boardActions.deleteCard(card)
        this.closeCardDetailsModal()
    }

    /**
     * Calls boardAction to copy a card
     * @param {object} card The card that needs to be copied
     */
    copyCard(card) {
        boardActions.copyCard(card)
        this.closeCardDetailsModal()
    }

    render() { // eslint-disable-line
        const { board, showCardDetails, cardToView } = this.state

        return (
            <div>
                {board &&
                    <BoardModalWrapper
                    board={board}
                    onCardClick={this.viewCardDetails}
                    onCreateCard={this.initCreateCard}
                    onCreateNewList={this.createNewList}
                    showCardDetails={showCardDetails}
                    onHideCardDetails={this.closeCardDetailsModal}
                    onSaveCard={this.saveCard}
                    onDelteCard={this.deleteCard}
                    onCopyCard={this.copyCard}
                    cardToView={cardToView}/>}
            </div>
        )
    }
}

export default BoardContainer
