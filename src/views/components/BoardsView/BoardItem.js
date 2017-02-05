import React from 'react'
import * as boardUtils from '../../../utils/boardUtils'
import { DropdownButton, MenuItem } from 'react-bootstrap'

const DELETE_EVENT_KEY = 1

/**
 * Component that represents a Board Item. Ment to be used with BoardItemsList Component
 * @class comp/BoardItem
 * @param {object} board - The Board data
 * @param {function} onDeleteBoard - function to execute when the board should be deleted
 */
export default class BoardItem extends React.Component {

    constructor(props) { // eslint-disable-line
        super(props)

        this.preventEventPropagation = this.preventEventPropagation.bind(this)
        this.onActionSelect = this.onActionSelect.bind(this)
    }

    /**
     * Stops event propagation
     * @param {object} e the event object
     */
    preventEventPropagation(e) {
        e.stopPropagation()
    }

    /**
     * Handler for the dropdown actions
     * @param {number} eventKey the eventKey number of the MenuItem
     * @param {object} e the event obejct
     */
    onActionSelect(eventKey, e) {
        e.stopPropagation()

        switch (eventKey) {
        case DELETE_EVENT_KEY: // Delete option
            this.props.onDeleteBoard(this.props.board)
            break
        }
    }

    render() { // eslint-disable-line
        const { board } = this.props
        return (
            <div className="my-board-item">
                <div className="my-board-item-title">{ board.title }</div>
                <DropdownButton
                    onClick={this.preventEventPropagation}
                    onSelect={this.onActionSelect}
                    pullRight
                    className="my-board-item-dropdown-overrides"
                    bsStyle="link"
                    title=""
                    id={board.id + '-dropdown'}>
                        <MenuItem eventKey={DELETE_EVENT_KEY}>Delete</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}

BoardItem.propTypes = {
    board: boardUtils.boardPropType.isRequired,
    onDeleteBoard: React.PropTypes.func.isRequired
}
