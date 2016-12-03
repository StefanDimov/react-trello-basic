import React from 'react'
import Board from '../components/Board'
import CardDetails from '../components/CardDetails'
import { Modal } from 'react-bootstrap'

export default class BoardContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCardDetails: false
        }
    }

    closeModal(modalKey) {
        this.setState({
            [modalKey]: false
        })
    }

    cardClickHandler() {
        this.setState({
            showCardDetails: true
        })
    }

    createCardHandler() {
        console.log('add card clicked')
    }

    render() {
        const { boardData } = this.props

        return (
            <div>
                <Board
                    title={boardData.title}
                    lists={boardData.lists}
                    onCardClick={this.cardClickHandler.bind(this)}
                    onCreateCardClick={this.createCardHandler.bind(this)} />

                <Modal show={this.state.showCardDetails} onHide={this.closeModal.bind(this, 'showCardDetails')}>
                    <Modal.Body>
                        <CardDetails></CardDetails>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
