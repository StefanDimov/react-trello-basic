import * as boardUtils from '../../src/utils/boardUtils'

describe('boardUtils', () => {

    describe('createEmptyBoard', () => {

        it('should create empty board', () => {
            const emptyBoard = boardUtils.createEmptyBoard()
            expect(typeof emptyBoard.id).toBe('string')
            expect(emptyBoard).toMatchObject({ title: '', lists: [] })
        })

        it('should generate unique ids', () => {
            const emptyBoard = boardUtils.createEmptyBoard()
            const anotherBoard = boardUtils.createEmptyBoard()

            expect(emptyBoard.id).not.toBe(anotherBoard.id)
        })
    })
})
