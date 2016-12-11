import React from 'react'
import R from 'ramda'
import cardUtils from '../utils/cardUtils'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class CardDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = R.clone(props.card)

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value})
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        // doesn't do anything
        // just to disable page reload on hitting enter
    }

    componentWillUnmount() {
        // if the card has been changed
        // also when new card: it won't go in if no field has been changed
        if (!R.equals(this.state, this.props.card)) {
            // save new card
            this.props.onCardSave(R.clone(this.state));
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        id="card-details-title-input"
                        type="text"
                        value={this.state.title}
                        placeholder="Title..."
                        onChange={this.handleTitleChange} />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        id="card-details-description-input"
                        componentClass="textarea"
                        value={this.state.description}
                        placeholder="Description..."
                        onChange={this.handleDescriptionChange} />
                </FormGroup>
            </form>
        )
    }
}

CardDetails.propTypes = {
    card: cardUtils.cardPropType.isRequired,
    onCardSave: React.PropTypes.func.isRequired
}
