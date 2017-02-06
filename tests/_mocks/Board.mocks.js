/* eslint require-jsdoc: off */
import R from 'ramda'
import { getEmptyList, getListWithCards } from './CardList.mocks'

export function getEmptyBoard(mark='') {
    return {
        id: 'boardId' + mark,
        title: 'boardTitle' + mark,
        lists: []
    }
}

export function getBoardWithLists({ mark='', numberOfLists=0 } = {}) {
    const id = 'boardId' + mark
    return {
        id,
        title: 'boardTitle' + mark,
        lists: R.range(0, numberOfLists).map((i) => getEmptyList({ mark: i, boardId: id }))
    }
}

export function getBoardWithListsWithCards({ mark='', numberOfLists=0, numberOfCardsInLists=0 } = {}) {
    const id = 'boardId' + mark
    return {
        id,
        title: 'boardTitle' + mark,
        lists: R.range(0, numberOfLists).map((i) => getListWithCards({ mark: i, boardId: id, numberOfCards: numberOfCardsInLists }))
    }
}
