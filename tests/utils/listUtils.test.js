import listUtils from '../../src/utils/listUtils'

describe('listUtils', () => {

    describe('createEmptyList', () => {

        it('creates empty list only with unique id when no args are passed', () => {
            const emptyList = listUtils.createEmptyList()

            expect(emptyList.boardId).toBe(null)
            expect(typeof emptyList.id).toBe('string')
            expect(emptyList.title).toBe('')
            expect(emptyList.cards instanceof Array).toBe(true)
            expect(emptyList.cards.length).toBe(0)
        })

        it('sets boardId when passed as argument', () => {
            const emptyList = listUtils.createEmptyList('boardId')
            expect(emptyList.boardId).toBe('boardId')
        })

        it('generates unique list ids', () => {
            const emptyList = listUtils.createEmptyList()
            const anotherList = listUtils.createEmptyList()
            const thirdList = listUtils.createEmptyList()

            expect(emptyList.id).not.toBe(anotherList.id)
            expect(emptyList.id).not.toBe(thirdList.id)
        })
    })
})
