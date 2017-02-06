/* eslint require-jsdoc: off */
import R from 'ramda'
import { getBasicCard } from './Card.mocks'

export function getEmptyList({ mark='', boardId } = {}) {
    return {
        boardId: boardId || 'listBoardId' + mark,
        id: 'listId' + mark,
        title: 'list title' + mark,
        cards: []
    }
}

export function getListWithCards({ mark='', boardId, numberOfCards=0 } = {}) {
    const id = 'listId' + mark
    return {
        boardId: boardId || 'listBoardId' + mark,
        id,
        title: 'list title' + mark,
        cards: R.range(0, numberOfCards).map((i) => getBasicCard({ mark: i, listId: id }))
    }
}
