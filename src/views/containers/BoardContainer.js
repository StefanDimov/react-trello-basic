import React from 'react'

import cardUtils from '../../utils/cardUtils'

import boardStore from '../../stores/boardStore'
import * as boardActions from '../../actions/boardActions'

import BoardModalWrapper from '../components/BoardView/BoardModalWrapper'

export default class BoardContainer extends React.Component {
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
            board: boardStore.getBoard(),
            showCardDetails: false,
            cardToView: null
        }
    }

    componentWillMount() {
        // subscribes to store
        boardStore.on('change', this.setBoard)
    }

    componentWillUnmount() {
        // unsubscribes to store
        boardStore.unbindListener('change', this.setBoard)
    }

    setBoard() {
        // sets board state from store
        this.setState({ board: boardStore.getBoard() })
    }

    // opens CardDetails Modal with card
    viewCardDetails(card) {
        this.setState({
            showCardDetails: true,
            cardToView: card
        })
    }

    // closes CardDetails Modal and clears state
    closeCardDetailsModal() {
        this.setState({
            showCardDetails: false,
            cardToView: null
        })
    }

    // opens CardDetails Modal with new empty card
    initCreateCard(listId) {
        this.setState({
            showCardDetails: true,
            cardToView: cardUtils.createEmptyCard(listId)
        })
    }

    createNewList(listName) {
        boardActions.addNewList(listName)
    }

    saveCard(card) {
        boardActions.saveCard(card)
    }

    deleteCard(card) {
        boardActions.deleteCard(card)
        this.closeCardDetailsModal()
    }

    copyCard(card) {
        boardActions.copyCard(card)
        this.closeCardDetailsModal()
    }

    render() {
        const { board, showCardDetails, cardToView } = this.state

        return (
            <BoardModalWrapper
                board={board}
                onCardClick={this.viewCardDetails}
                onCreateCardClick={this.initCreateCard}
                onCreateNewList={this.createNewList}
                showCardDetails={showCardDetails}
                onHideCardDetails={this.closeCardDetailsModal}
                onSaveCard={this.saveCard}
                onDelteCard={this.deleteCard}
                onCopyCard={this.copyCard}
                cardToView={cardToView}/>
        )
    }
}
