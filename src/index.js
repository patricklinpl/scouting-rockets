import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

/** Entry point of React Application - Renders App.js */
ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
