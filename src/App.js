import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Games from './components/Games'
import Assign from './components/Assign'
import './App.css'

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
