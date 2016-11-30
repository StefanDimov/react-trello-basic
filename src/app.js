import React from 'react'
import { render } from 'react-dom'

import Board from './components/Board'

const boardData = {
    title: 'First Board',
    lists: [
        {
            title: 'Backlog',
            cards: [{ title: 'Develop app' }, { title: 'Test app' }]
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

render(<Board title={boardData.title} lists={boardData.lists} />, document.getElementById('app'))
