import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Tables from '../components/Tables'
import Header from '../components/Header'
import Load from '../components/Load'
import {getGames} from '../utils/restHandler'

export default class Games extends Component {
  constructor (props) {
    super(props)
    this.state = {
      games: []
    }
    this.mapGameHeaders.bind(this)
    this.mapGameRows.bind(this)
  }

  /** Fetch the list of games on first mount */
  async componentDidMount () {
    this.setState({games: await getGames()})
  }

  /**
   * Produce custom table headers
   * @return {} Material UI Table Components
   */
  mapGameHeaders () {
    return (
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>Away</TableCell>
        <TableCell>VS</TableCell>
        <TableCell>Home</TableCell>
        <TableCell>Location</TableCell>
        <TableCell>Assignment</TableCell>
      </TableRow>
    )
  }

  /**
   * Parse game objects to produce Material UI table row components.
   * @param {array} games - An array of game objects.
   * @return {array} An array of Material UI table row components with parsed game data.
   */
  mapGameRows (games) {
    return games.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.gameDate.split('T')[0]}</TableCell>
        <TableCell>{row.awayTeam.fullName}</TableCell>
        <TableCell>@</TableCell>
        <TableCell>{row.homeTeam.fullName}</TableCell>
        <TableCell>{row.homeTeam.city}</TableCell>
        <TableCell>{row.id}</TableCell>
      </TableRow>
    ))
  }

  /** Renders a table of Games */
  render () {
    const { games } = this.state
    return (
      <div className='App'>
        <Header text='NBA Game Schedule' />
        {/* Check if game data is loaded */}
        {games.length ? (
          <Tables
            mapHeaders={this.mapGameHeaders()}
            mapRows={this.mapGameRows(games)}
          />
        ) : (
          <div>
            <Load />
          </div>
        )}
      </div>
    )
  }
}
