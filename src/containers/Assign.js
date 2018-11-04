import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Load from '../components/Load'
import Tables from '../components/Tables'
import Header from '../components/Header'
import { getAssignments } from '../utils/restHandler'

export default class Assign extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameDate: '',
      gameData: '',
      noAssignment: false,
      assignment: []
    }
    this.mapAssignHeaders.bind(this)
    this.mapAssignRows.bind(this)
  }

  /** Fetch the list of assignments for current game on first mount */
  async componentDidMount () {
    const gameId = this.props.location.id
    const response = await getAssignments(gameId)
    this.setState({
      gameDate: response.gameDate.split('T')[0],
      gameData: `${response.awayTeam.name} @ ${response.homeTeam.name}`,
      noAssignment: response.assignments.length === 0,
      assignment: response.assignments
    })
  }

  /**
   * Produce custom table headers
   * @return {} Material UI Table Components
   */
  mapAssignHeaders () {
    return (
      <TableRow>
        <TableCell>Assigned Date</TableCell>
        <TableCell>Scout Name</TableCell>
        <TableCell>Completed Date</TableCell>
        <TableCell>Notes</TableCell>
      </TableRow>
    )
  }

  /**
   * Parse game assignment objects to produce Material UI table row components.
   * @param {array} assignment - An array of game assignment objects.
   * @return {array} An array of Material UI table row components with parsed game data.
   */
  mapAssignRows (assignment) {
    return assignment.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.assignedAt.split('T')[0]}</TableCell>
        <TableCell>{row.scout.fullName}</TableCell>
        <TableCell>{row.isComplete ? row.completedAt : 'N/A'}</TableCell>
        <TableCell>{row.notes}</TableCell>
      </TableRow>
    ))
  }

  /** Renders a table of Assignments */
  render () {
    const { assignment } = this.state
    return (
      <div className='App'>
        <Header text={`${this.state.gameDate} | ${this.state.gameData}`} />
        {/* Check if assignment data is loaded */}
        {assignment.length ? (
          <Tables
            mapHeaders={this.mapAssignHeaders()}
            mapRows={this.mapAssignRows(assignment)}
          />
        ) : (
          this.state.noAssignment ? '' : <Load />
        )}
        {this.state.noAssignment ? (
          <div>
            <Paper className={{ padding: 20 }} elevation={1}>
              <Typography variant='h5' component='h3'>
                No Assignments Found
              </Typography>
            </Paper>
          </div>
        ) : ''}
      </div>
    )
  }
}
