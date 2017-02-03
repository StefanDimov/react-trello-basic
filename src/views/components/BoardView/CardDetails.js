import React from 'react'
import R from 'ramda'
import * as cardUtils from '../../../utils/cardUtils'
import { Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

/**
 * Component that visualizes a Card's data in inputs. Card's data can be edited.
 * There is a side menu with actions that can be performed on the card as well.
 * @class comp/CardDetails
 * @param {object} card The card data to be visualized
 * @param {function} onCardSave callback which is called with the data when a card needs to be saved
 * @param {function} onCardDelete callback which is called with the data when a card needs to be deleted
 * @param {function} onCardCopy callback which is called with the data when a card needs to be copied
 */
export default class CardDetails extends React.Component {
    constructor(props) { // eslint-disable-line
        super(props)

        this.state = R.clone(props.card)

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /**
     * Handler for the change event of the title input
     * @private
     * @param {object} event event data passed to the handler
     */
    handleTitleChange(event) {
        this.setState({title: event.target.value})
    }

    /**
     * Handler for the change event of the description input
     * @private
     * @param {object} event event data passed to the handler
     */
    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }

    /**
     * Handler for the submit event of the form
     * @private
     * @param {object} event event data passed to the handler
     */
    handleSubmit(event) {
        event.preventDefault()
        // doesn't do anything
        // just to disable page reload on hitting enter
    }

    /**
     * When the component will unmount it will check if the card's data
     * has been changed in any way, if so it will call the onCardSave callback.
     * Also when new card is used (no fields assigned) it won't go in if no
     * field has been changed.
     * @private
     */
    componentWillUnmount() {
        // if the card has been changed
        if (!R.equals(this.state, this.props.card)) {
            // save new card
            this.props.onCardSave(R.clone(this.state))
        }
    }

    render() { // eslint-disable-line
        return (
            <Row>
                <Col sm={9}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <ControlLabel htmlFor="card-details-title-input">Title</ControlLabel>
                            <FormControl
                                id="card-details-title-input"
                                type="text"
                                value={this.state.title}
                                placeholder="Title..."
                                onChange={this.handleTitleChange} />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel htmlFor="card-details-description-input">Description</ControlLabel>
                            <FormControl
                                id="card-details-description-input"
                                componentClass="textarea"
                                value={this.state.description}
                                placeholder="Description..."
                                onChange={this.handleDescriptionChange} />
                        </FormGroup>
                    </form>
                </Col>

                <Col sm={3}>
                    <ControlLabel>Actions</ControlLabel>
                    <Button
                        id="card-copy-button"
                        block={true}
                        onClick={() => this.props.onCardCopy(R.clone(this.state))}
                        bsStyle="primary" bsSize="sm">Copy</Button>

                    <Button
                        id="card-delete-button"
                        block={true}
                        onClick={() => this.props.onCardDelete(R.clone(this.state))}
                        bsStyle="danger" bsSize="sm">Delete</Button>
                </Col>
            </Row>
        )
    }
}

CardDetails.propTypes = {
    card: cardUtils.cardPropType.isRequired,
    onCardSave: React.PropTypes.func.isRequired,
    onCardDelete: React.PropTypes.func.isRequired,
    onCardCopy: React.PropTypes.func.isRequired
}
