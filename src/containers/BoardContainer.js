import React from 'react'
import { Modal } from 'react-bootstrap'

import cardUtils from '../utils/cardUtils'
import boardUtils from '../utils/boardUtils'

import boardStore from '../stores/boardStore'
import * as boardActions from '../actions/boardActions'

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
        boardStore.on('change', this.setBoard)
    }

    componentWillUnmount() {
        boardStore.unbindListener('change', this.setBoard)
    }

    setBoard() {
        this.setState({ board: boardStore.getBoard() })
    }

    viewCardDetails(card) {
        this.setState({
            showCardDetails: true,
            cardToView: card
        })
    }

    closeCardDetailsModal() {
        this.setState({
            showCardDetails: false,
            cardToView: null
        })
    }

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
