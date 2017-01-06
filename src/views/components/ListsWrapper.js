import React from 'react'

export default class ListsWrapper extends React.Component {
    render() {
        return <div className="my-lists-container">{this.props.children}</div>
    }
}
