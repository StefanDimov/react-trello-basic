import boardUtils from '../../src/utils/boardUtils'

describe('boardUtils', () => {

    describe('createEmptyBoard', () => {

        it('it should create empty board', () => {
            const empryBoard = boardUtils.createEmptyBoard()
            expect(typeof empryBoard.id).toBe('string')
            expect(empryBoard.title).toBe('')
            expect(empryBoard.lists).toBe([])
        })

    })
})
