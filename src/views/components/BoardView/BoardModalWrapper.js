import React from 'react'

import boardUtils from '../../../utils/boardUtils'
import cardUtils from '../../../utils/cardUtils'

import { Modal } from 'react-bootstrap'
import Board from './Board'
import CardDetails from './CardDetails'

export default class BoardModalWrapper extends React.Component {
    render() {
        return (
            <div>
                <Board
                    board={this.props.board}
                    onCardClick={this.props.onCardClick}
                    onCreateCardClick={this.props.onCreateCardClick}
                    onCreateNewList={this.props.onCreateNewList} />

                <Modal show={this.props.showCardDetails} onHide={this.props.onHideCardDetails} animation={false}>
                    <Modal.Body>
                        {this.props.cardToView &&
                            <CardDetails
                                card={this.props.cardToView}
                                onCardSave={this.props.onSaveCard}
                                onCardDelete={this.props.onDelteCard}
                                onCardCopy={this.props.onCopyCard} />}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const { func, bool } = React.PropTypes

BoardModalWrapper.propTypes = {
    board: boardUtils.boardPropType.isRequired,
    onCardClick: func.isRequired,
    onCreateCardClick: func.isRequired,
    onCreateNewList: func.isRequired,
    showCardDetails: bool.isRequired,
    onHideCardDetails: func.isRequired,
    onSaveCard: func.isRequired,
    onDelteCard: func.isRequired,
    onCopyCard: func.isRequired,
    cardToView: cardUtils.cardPropType
}
