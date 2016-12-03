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
        this.createCardHandler = this.createCardHandler.bind(this)
        this.closeCardDetailsModal = this.closeCardDetailsModal.bind(this)
    }

    viewCardDetails(card) {
        this.setState({
            showCardDetails: true,
            cardToView: card
        })
    }

    createCardHandler(list) {

        // TODO Fix Mutation?
        let newCard = cardUtils.createEmptyCard()
        list.cards.push(newCard)

        this.setState({
            showCardDetails: true,
            cardToView: newCard
        })
    }

    closeCardDetailsModal() {
        this.setState({
            showCardDetails: false,
            cardToView: null
        })
    }

    render() {
        const { boardData } = this.props

        return (
            <div>
                <Board
                    title={boardData.title}
                    lists={boardData.lists}
                    onCardClick={this.viewCardDetails}
                    onCreateCardClick={this.createCardHandler} />

                <Modal show={this.state.showCardDetails} onHide={this.closeCardDetailsModal} animation={false}>
                    <Modal.Body>
                        {this.state.cardToView && <CardDetails card={this.state.cardToView}></CardDetails>}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
