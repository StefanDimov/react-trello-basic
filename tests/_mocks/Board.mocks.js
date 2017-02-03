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

export function getBoardWithLists(mark='', numberOfLists) {
    return {
        id: 'boardId' + mark,
        title: 'boardTitle' + mark,
        lists: R.range(0, numberOfLists).map((i) => getEmptyList(i))
    }
}

export function getBoardWithListsWithCards(mark='', numberOfLists, numberOfCardsInLists) {
    return {
        id: 'boardId' + mark,
        title: 'boardTitle' + mark,
        lists: R.range(0, numberOfLists).map((i) => getListWithCards(i, numberOfCardsInLists))
    }
}
