/* eslint no-unused-vars: 0 */

import React from 'react'
import { render } from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import CustomStyles from './styles/_index.css'

import BoardContainer from './views/containers/BoardContainer'
import BoardsContainer from './views/containers/BoardsContainer'

render(<BoardContainer />, document.getElementById('app'))
