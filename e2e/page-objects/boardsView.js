module.exports = {
    url: function () {
        return this.api.globals.rootUrl
    },
    elements: {
        self: '#boardsView',
        addNewBoardInput: '#add-new-board-input',
        boardItem: '.my-board-item',
        boardItemDropdownButton: '.my-board-item .dropdown button',
        boardItemDropdownMenu: '.my-board-item .dropdown .dropdown-menu',
        boardItemDropdownDeleteOption: '.my-board-item .dropdown .dropdown-menu li:nth-of-type(1) a'
    }
}
