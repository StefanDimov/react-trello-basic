# React Trello Basic

A Trello clone build with React and Flux

## Usage

`npm start` - runs dev server
`npm run build` - builds app
`npm test` - runs tests
`npm test -- -u` - overrides and deletes test snapshots
`npm test -- --watch` - listens on file changes and runs appropriate tests
`npm test -- --coverage` - runs tests and gathers coverage data

## Todo

## Overall

- end-to-end tests

## Boards View

- Create new board
- Delete board
- save boards to storage

## Board View

- drag and drop cards
- lists in cards
- update board in storage

### Other

- scroll List Container with mouse drag

### Refactor

- make BoardContainer render a single component so you can test rendering the modal open
