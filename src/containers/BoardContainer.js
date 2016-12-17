import React from 'react'
import { Modal } from 'react-bootstrap'

import cardUtils from '../utils/cardUtils'
import boardUtils from '../utils/boardUtils'
import Board from '../components/Board'
import CardDetails from '../components/CardDetails'

export default class BoardContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCardDetails: false,
            cardToView: null
        }

        this.viewCardDetails = this.viewCardDetails.bind(this)
        this.initCreateCard = this.initCreateCard.bind(this)
        this.saveCard = this.saveCard.bind(this)
        this.closeCardDetailsModal = this.closeCardDetailsModal.bind(this)
        this.createNewList = this.createNewList.bind(this)
    }

    viewCardDetails(card) {
        this.setState({
            showCardDetails: true,
            cardToView: card
        })
    }

    initCreateCard(listId) {
        this.setState({
            showCardDetails: true,
            cardToView: cardUtils.createEmptyCard(listId)
        })
    }

    createNewList(listName) {
        // TODO: Implement: Create new list
        console.log(listName);
    }

    closeCardDetailsModal() {
        this.setState({
            showCardDetails: false,
            cardToView: null
        })
    }

    saveCard(newCard) {
        // TODO: Implement: Save card action
        console.log(newCard);
    }

    render() {
        const { board } = this.props

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

BoardContainer.propTypes = {
    board: boardUtils.boardPropType.isRequired
}
