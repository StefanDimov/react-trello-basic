import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

export default class AddNewBoardItem extends React.Component {
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
        e.preventDefault()
        this.props.onCreateBoard(this.state.value)
        this.setState({ value: '' })
    }

    render() {
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

AddNewBoardItem.propTypes = {
    onCreateBoard: React.PropTypes.func.isRequired
}
