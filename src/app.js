import React from 'react'
import { render } from 'react-dom'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import BoardContainer from './containers/BoardContainer'

const boardData = {
    title: 'First Board',
    lists: [
        {
            title: 'Backlog',
            cards: [{ id:'1', title: 'Develop app' }, { id:'2', title: 'Test app' }]
        },
        {
            title: 'ToDo',
            cards: [{ id:'3', title: 'Learn Redux' }]
        },
        {
            title: 'In Progress',
            cards: [{ id:'4', title: 'Learn React' }, { id:'5', title: 'Try Flux' }]
        },
        {
            title: 'Done',
            cards: []
        }
    ]
}

render(<BoardContainer boardData={boardData} />, document.getElementById('app'))
