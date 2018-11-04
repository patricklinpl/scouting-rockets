import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Games from './containers/Games'
import Assign from './containers/Assign'
import './App.css'

/** React Router handles endpoints and routes to the target component */
export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Games} />
            <Route path='/assignment' component={Assign} />
            <Route render={() => <p>404: Page Not Found</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
