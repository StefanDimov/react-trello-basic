import cardUtils from '../../src/utils/cardUtils'

describe('cardUtils', () => {

    describe('createEmptyCard', () => {

        it('creates empty card only with unique id when no args are passed', () => {
            const emptyCard = cardUtils.createEmptyCard()

            expect(typeof emptyCard.id).toBe('string')
            expect(emptyCard).toMatchObject({ listId: null, title: '', description: '' })
        })

        it('sets listId when passed as argument', () => {
            const emptyCard = cardUtils.createEmptyCard('listId')
            expect(emptyCard.listId).toBe('listId')
        })

        it('generates unique card ids', () => {
            const emptyCard = cardUtils.createEmptyCard()
            const anotherCard = cardUtils.createEmptyCard()
            const thirdCard = cardUtils.createEmptyCard()

            expect(emptyCard.id).not.toBe(anotherCard.id)
            expect(emptyCard.id).not.toBe(thirdCard.id)
        })
    })
})
