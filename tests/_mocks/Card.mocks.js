/* eslint require-jsdoc: off */
export function getCardOnlyWithIds({ mark='', listId } = {}) {
    return {
        listId: listId || 'cardListId' + mark,
        id: 'cardId' + mark
    }
}

export function getBasicCard({ mark='', listId } = {}) {
    return {
        listId: listId || 'cardListId' + mark,
        id: 'cardId' + mark,
        title: 'card title' + mark,
        description: 'card' + mark
    }
}
