/* eslint require-jsdoc: off */
export function getCardOnlyWithIds(mark='') {
    return {
        listId: 'cardListId' + mark,
        id: 'cardId' + mark
    }
}

export function getBasicCard(mark='') {
    return {
        listId: 'cardListId' + mark,
        id: 'cardId' + mark,
        title: 'card title' + mark,
        description: 'card' + mark
    }
}
