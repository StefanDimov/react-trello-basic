import React from 'react'
import { render } from 'react-dom'

import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import BoardContainer from './containers/BoardContainer'

const boardData = {
    title: 'First Board',
    lists: [
        {
            title: 'Backlog',
            cards: [{ title: 'Develop app' }, { title: 'Test app' }]
        },
        {
            title: 'ToDo',
            cards: [{ title: 'Learn Redux' }]
        },
        {
            title: 'In Progress',
            cards: [{ title: 'Learn React' }, { title: 'Try Flux' }]
        },
        {
            title: 'Done',
            cards: []
        }
    ]
}

render(<BoardContainer boardData={boardData} />, document.getElementById('app'))
