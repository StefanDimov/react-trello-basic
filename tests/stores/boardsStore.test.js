import boardsStore from '../../src/stores/boardsStore'

describe('boardsStore', () => {
    describe('getBoards', () => {
        it('should return an array of boards', () => {
            const boards = boardsStore.getBoards()

            expect(boards).toBeDefined()
            expect(boards instanceof Array).toBe(true)
        })

        it('should returned board should not be a reference to the private state', () => {
            const boards = boardsStore.getBoards()
            const boardsSecond = boardsStore.getBoards()

            expect(boards).toMatchObject(boardsSecond)
            expect(boards).not.toBe(boardsSecond)
        })
    })
})
