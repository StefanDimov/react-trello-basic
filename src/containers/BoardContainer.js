import React from 'react'
import Board from '../components/Board'
import cardUtils from '../utils/cardUtils'
import CardDetails from '../components/CardDetails'
import { Modal } from 'react-bootstrap'

export default class BoardContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCardDetails: false,
            cardToView: null
        }

        this.viewCardDetails = this.viewCardDetails.bind(this)
        this.createCard = this.createCard.bind(this)
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

    createCard(listId) {
        this.setState({
            showCardDetails: true,
            cardToView: cardUtils.createEmptyCard(listId)
        })
    }

    createNewList(listName) {
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
        const { boardData } = this.props

        return (
            <div>
                <Board
                    title={boardData.title}
                    lists={boardData.lists}
                    onCardClick={this.viewCardDetails}
                    onCreateCardClick={this.createCard}
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
