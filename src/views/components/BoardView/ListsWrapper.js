import React from 'react'

/**
 * Component that adds proper styles to CardList components to be visualized side by side.
 * CardList should be passed as `children`, AddNewListInput as well.
 * @class comp/ListsWrapper
 */
export default class ListsWrapper extends React.Component {
    render() { // eslint-disable-line
        return <div className="my-lists-container">{this.props.children}</div>
    }
}
