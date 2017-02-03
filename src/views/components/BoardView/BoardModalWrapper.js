import React from 'react'

import * as boardUtils from '../../../utils/boardUtils'
import * as cardUtils from '../../../utils/cardUtils'

import { Modal } from 'react-bootstrap'
import Board from './Board'
import CardDetails from './CardDetails'

/**
 * Component that wraps a Board component and a CardDetails Modal for creating and editing cards.
 * @class comp/BoardModalWrapper
 * @param {object} board The board to be visualized
 * @param {object} cardToView The card to view in the CardDetails Modal
 * @param {bool} showCardDetails If the CardDetails Modal should be visible
 * @param {function} onCardClick callback for when a card is clicked
 * @param {function} onCreateCard callback to which data for creating a new card will be passed
 * @param {function} onCreateNewList callback to which data for creating a new list will be passed
 * @param {function} onHideCardDetails callback for when CardDetails Modal hides itself
 * @param {function} onSaveCard callback for when CardDetails Modal wants a card to be saved
 * @param {function} onDelteCard callback for when CardDetails Modal wants a card to be deleted
 * @param {function} onCopyCard callback for when CardDetails Modal wants a card to be copied
 */
export default class BoardModalWrapper extends React.Component {
    render() { // eslint-disable-line
        return (
            <div>
                <Board
                    board={this.props.board}
                    onCardClick={this.props.onCardClick}
                    onCreateCard={this.props.onCreateCard}
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
    onCreateCard: func.isRequired,
    onCreateNewList: func.isRequired,
    showCardDetails: bool.isRequired,
    onHideCardDetails: func.isRequired,
    onSaveCard: func.isRequired,
    onDelteCard: func.isRequired,
    onCopyCard: func.isRequired,
    cardToView: cardUtils.cardPropType
}
