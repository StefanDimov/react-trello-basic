import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

export default class AddNewListInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = { value: '' }

        this.changeValueHandler = this.changeValueHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeValueHandler(e) {
        this.setState({ value: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onCreateList(this.state.value)
        this.setState({ value: '' })
    }

    render() {
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
