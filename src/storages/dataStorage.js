/** @module dataStorage */
import R from 'ramda'
import Lockr from 'lockr'

import { LOCAL_STORAGE_DATA_KEY } from '../config'

/**
 * Gets all boards from localStorage
 * @private
 * @return {array} All the boards
 */
const _getAllBoards = () => {
    return Lockr.get(LOCAL_STORAGE_DATA_KEY, [])
}

/**
 * Saves all the boards to localStorage
 * @private
 * @param {array} boards All the boards to save
 */
const _saveAllBoards = boards => {
    Lockr.set(LOCAL_STORAGE_DATA_KEY, boards)
}

/**
 * Returns all boards from storage
 * @return {array} All boards from storage
 */
export function getAllBoards() {
    return _getAllBoards()
}

/**
 * Get a board from storage by id
 * @param  {string} id Id of the board to get
 * @return {object}    Board
 */
export function getBoard(id) {
    return _getAllBoards()
            .filter(R.propEq('id', id))
            .pop()
}

/**
 * Adds board to storage
 * @param {object} board Board to add to storage
 */
export function addBoard(board) {
    const allBoards = _getAllBoards()
    const updatedBoards = R.append(board, allBoards)
    _saveAllBoards(updatedBoards)
}

/**
 * Update board in storage
 * @param {object} board Updated board
 */
export function updateBoard(board) {
    const allBoards = _getAllBoards()
    const boardToUpdateIndex = R.findIndex(R.propEq('id', board.id), allBoards)
    const updatedBoards = R.update(boardToUpdateIndex, board, allBoards)
    _saveAllBoards(updatedBoards)
}

/**
 * Delets a board from storage
 * @param  {board} board The board that should be deleted
 */
export function deleteBoard(board) {
    const allBoards = _getAllBoards()
    const leftBoards = R.without([board], allBoards)
    _saveAllBoards(leftBoards)
}
