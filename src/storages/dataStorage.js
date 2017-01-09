import R from 'ramda'
import Lockr from 'lockr'

import { LOCAL_STORAGE_DATA_KEY } from '../config'

const _getAllBoards = () => {
    return Lockr.get(LOCAL_STORAGE_DATA_KEY)
}

const _saveAllBoards = boards => {
    Lockr.set(LOCAL_STORAGE_DATA_KEY, boards)
}

const dataStorage = {}

dataStorage.getAllBoards = () => {
    return _getAllBoards()
}

dataStorage.getBoard = id => {
    return _getAllBoards()
            .filter(R.propEq('id', id))
            .pop()
}

dataStorage.addBoard = board => {
    const allBoards = _getAllBoards()
    const updatedBoards = R.append(board, allBoards)
    _saveAllBoards(updatedBoards)
}

dataStorage.updateBoard = board => {
    const allBoards = _getAllBoards()
    const boardToUpdateIndex = R.findIndex(R.propEq('id', board.id), allBoards)
    const updatedBoards = R.update(boardToUpdateIndex, board, allBoards)
    _saveAllBoards(updatedBoards)
}

export default dataStorage
