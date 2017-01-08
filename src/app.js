/* eslint no-unused-vars: 0 */

import React from 'react'
import { render } from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import CustomStyles from './styles/_index.css'

import { Router, Route, hashHistory } from 'react-router'
import BoardContainer from './views/containers/BoardContainer'
import BoardsContainer from './views/containers/BoardsContainer'

render((
    <Router history={hashHistory}>
        <Route path="/" component={BoardsContainer}></Route>
        <Route path="/board/:boardId" component={BoardContainer}></Route>
    </Router>
), document.getElementById('app'))
