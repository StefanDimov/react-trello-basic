import R from 'ramda'
import cardUtils from '../../src/utils/cardUtils'
import { getBasicCard } from '../_mocks/Card.mocks'

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

    describe('changeCardId', () => {
        let card

        beforeEach(() => {
            card = getBasicCard()
        })

        it('it returns a card with the same props but different ids', () => {
            const newCard = cardUtils.changeCardId(card)

            expect(newCard).not.toEqual(card)
            expect(newCard).not.toMatchObject(card)
            expect(newCard.title).toEqual(card.title)
            expect(newCard.description).toEqual(card.description)
        })
    })
})
