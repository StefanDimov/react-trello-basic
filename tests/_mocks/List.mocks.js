import R from 'ramda'
import { getBasicCard } from './Card.mocks'

export function getEmptyList(mark='') {
    return {
        boardId: 'listBoardId' + mark,
        id: 'listId' + mark,
        title: 'list title' + mark,
        cards: []
    }
}

export function getListWithCards(mark="", numberOfCards=0) {
    return {
        boardId: 'listBoardId' + mark,
        id: 'listId' + mark,
        title: 'list title' + mark,
        cards: R.range(0, numberOfCards).map((i) => getBasicCard(i))
    }
}
