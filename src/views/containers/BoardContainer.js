import React from 'react'
import { Modal } from 'react-bootstrap'

import cardUtils from '../../utils/cardUtils'

import boardStore from '../../stores/boardStore'
import * as boardActions from '../../actions/boardActions'

import Board from '../components/Board'
import CardDetails from '../components/CardDetails'

export default class BoardContainer extends React.Component {
    constructor(props) {
        super(props)

        this.setBoard = this.setBoard.bind(this)
        this.viewCardDetails = this.viewCardDetails.bind(this)
        this.initCreateCard = this.initCreateCard.bind(this)
        this.saveCard = this.saveCard.bind(this)
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

    // opens CardDetails with card
    viewCardDetails(card) {
        this.setState({
            showCardDetails: true,
            cardToView: card
        })
    }

    // closes CardDetails and clears state
    closeCardDetailsModal() {
        this.setState({
            showCardDetails: false,
            cardToView: null
        })
    }

    // opens CardDetails with new empty card
    initCreateCard(listId) {
        this.setState({
            showCardDetails: true,
            cardToView: cardUtils.createEmptyCard(listId)
        })
    }

    createNewList(listName) {
        boardActions.addNewList(listName);
    }

    saveCard(newCard) {
        // TODO: Implement: Save card action
        console.log(newCard);
    }

    render() {
        const { board } = this.state

        return (
            <div>
                <Board
                    board={board}
                    onCardClick={this.viewCardDetails}
                    onCreateCardClick={this.initCreateCard}
                    onCreateNewList={this.createNewList} />

                <Modal show={this.state.showCardDetails} onHide={this.closeCardDetailsModal} animation={false}>
                    <Modal.Body>
                        {this.state.cardToView &&
                            <CardDetails card={this.state.cardToView} onCardSave={this.saveCard} />}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
