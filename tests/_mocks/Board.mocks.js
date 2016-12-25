import R from 'ramda'
import { getEmptyList } from './List.mocks'

export function getEmptyBoard(mark='') {
    return {
        id: 'boardId' + mark,
        title: 'boardTitle' + mark,
        lists: []
    }
}

export function getEmptyBoardWithLists(mark='', numberOfLists) {
    return {
        id: 'boardId' + mark,
        title: 'boardTitle' + mark,
        lists: R.range(0, numberOfLists).map((i) => getEmptyList(i))
    }
}
