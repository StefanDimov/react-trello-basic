import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

/**
 * Component with an input for adding a new board. Mean to be used in BoardItemsList.
 * @class comp/AddNewBoardInput
 * @param {function} onCreateBoard - callback for on input submit
 */
export default class AddNewBoardInput extends React.Component {
    constructor(props) { // eslint-disable-line
        super(props)

        this.state = { value: '' }

        this.changeValueHandler = this.changeValueHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    /**
     * Change handler set on the input
     * @private
     * @param {object} e event object provided to handler
     */
    changeValueHandler(e) {
        this.setState({ value: e.target.value })
    }

    /**
     * Form submit handler. Calls callback with input value.
     * @private
     * @param {object} e event object provided to handler
     */
    onSubmit(e) {
        e.preventDefault()
        this.props.onCreateBoard(this.state.value)
        this.setState({ value: '' })
    }

    render() { // eslint-disable-line
        return (
            <form className="my-add-new-board" onSubmit={this.onSubmit}>
                <FormGroup>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        onChange={this.changeValueHandler}
                        placeholder="Add new board..." />
                </FormGroup>
            </form>
        )
    }
}

AddNewBoardInput.propTypes = {
    onCreateBoard: React.PropTypes.func.isRequired
}
