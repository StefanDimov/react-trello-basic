module.exports = {
    'Base url opens Boards view': function (client) {
        var boardsView = client.page.boardsView()

        boardsView
            .navigate()
            .assert.elementPresent('@self')
    },

    'Add new board': function (client) {
        var boardsView = client.page.boardsView()

        boardsView
            .assert.elementNotPresent('@boardItem')
            .setValue('@addNewBoardInput', ['nightwatch', client.Keys.ENTER])
            .assert.elementPresent('@boardItem')
            .assert.containsText('@boardItem', 'nightwatch')
    },

    'Board item leads to Board view': function (client) {
        var boardsView = client.page.boardsView()

        boardsView
            .assert.elementPresent('@boardItem')
            .click('@boardItem')
            .assert.urlContains('/board/')
    },

    'Board item is persisted': function (client) {
        var boardsView = client.page.boardsView()

        boardsView
            .navigate()
            .assert.elementPresent('@boardItem')
            .assert.containsText('@boardItem', 'nightwatch')
    },

    'Delete board': function (client) {
        var boardsView = client.page.boardsView()

        boardsView
            .assert.elementPresent('@boardItem')
            .assert.elementPresent('@boardItemDropdownButton')
            .click('@boardItemDropdownButton')
            .assert.visible('@boardItemDropdownMenu')
            .click('@boardItemDropdownDeleteOption')
            .assert.elementNotPresent('@boardItem')
    },

    'Can have multiple boards': function (client) {
        var boardsView = client.page.boardsView()

        boardsView
            .assert.elementNotPresent('@boardItem')
            .setValue('@addNewBoardInput', ['nightwatch', client.Keys.ENTER])
            .setValue('@addNewBoardInput', ['nightwatch 2', client.Keys.ENTER])

        // get all boardItesm
        client.elements('css selector', boardsView.elements.boardItem.selector, function (result) {

            // assert count
            client.assert.equal(result.value.length, 2, 'Two boards are present')

            // assert first board text
            client.elementIdText(result.value[0].ELEMENT, function(result) {
                client.assert.equal(result.value, 'nightwatch', 'First board name is correct')
            })

            // assert first board text
            client.elementIdText(result.value[1].ELEMENT, function(result) {
                client.assert.equal(result.value, 'nightwatch 2', 'Second board name is correct')
            })

            client.end()
        })
    }
}
