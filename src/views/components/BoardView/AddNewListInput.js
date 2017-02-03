import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

/**
 * Component with an input for adding a new list. Meant to be used in Board Component.
 * @class comp/AddNewListInput
 * @param {function} onCreateList callback for input submit
 */
export default class AddNewListInput extends React.Component {
    constructor(props) { // eslint-disable-line
        super(props)

        this.state = { value: '' }

        this.changeValueHandler = this.changeValueHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    /**
     * Controls the input change event
     * @private
     * @param {object} e event object
     */
    changeValueHandler(e) {
        this.setState({ value: e.target.value })
    }

    /**
     *  Controls the form submit event
     *  @private
     *  @param {object} e event object
     */
    onSubmit(e) {
        e.preventDefault()
        this.props.onCreateList(this.state.value)
        this.setState({ value: '' })
    }

    render() { // eslint-disable-line
        return (
            <form className="my-list-container-item" onSubmit={this.onSubmit}>
                <FormGroup>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        onChange={this.changeValueHandler}
                        placeholder="Add new list..." />
                </FormGroup>
            </form>
        )
    }
}

const { func } = React.PropTypes
AddNewListInput.propTypes = {
    onCreateList: func.isRequired
}
