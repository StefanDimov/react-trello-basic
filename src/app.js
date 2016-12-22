import React from 'react'
import { render } from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import CustomStyles from './styles/_index.css'

import BoardContainer from './containers/BoardContainer'

render(<BoardContainer />, document.getElementById('app'))
