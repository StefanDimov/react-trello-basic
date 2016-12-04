import React from 'react'
import { render } from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import BoardContainer from './containers/BoardContainer'

const boardData = {
    title: 'First Board',
    id: '1',
    lists: [
        {
            boardId: '1',
            id: '1',
            title: 'Backlog',
            cards: [{ id:'1', title: 'Develop app', description: 'Amazing' }, { id:'2', title: 'Test app' }]
        },
        {
            boardId: '1',
            id: '2',
            title: 'ToDo',
            cards: [{ id:'3', title: 'Learn Redux' }]
        },
        {
            boardId: '1',
            id: '3',
            title: 'In Progress',
            cards: [{ id:'4', title: 'Learn React' }, { id:'5', title: 'Try Flux' }]
        },
        {
            boardId: '1',
            id: '4',
            title: 'Done',
            cards: []
        }
    ]
}

render(<BoardContainer boardData={boardData} />, document.getElementById('app'))
