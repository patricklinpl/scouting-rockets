import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Load from '../components/Load'
import Tables from '../components/Tables'
import Header from '../components/Header'
import AssignForm from '../components/AssignForm'
import { getAssignments, addScouts } from '../utils/restHandler'

export default class Assign extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameDate: '',
      gameID: '',
      gameData: '',
      open: false,
      noAssignment: false,
      assignment: []
    }
    this.requestAssignmentData = this.requestAssignmentData.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.addAScout = this.addAScout.bind(this)
  }

  /** Fetch the list of assignments for current game on first mount */
  componentDidMount () {
    this.requestAssignmentData()
  }

  /** Get latest game data and scout data */
  async requestAssignmentData () {
    const gameId = this.props.location.id
    if (gameId) {
      const response = await getAssignments(gameId)
      this.setState({
        gameID: gameId,
        gameDate: response.gameDate.split('T')[0],
        gameData: `${response.awayTeam.name} @ ${response.homeTeam.name}`,
        noAssignment: response.assignments.length === 0,
        assignment: response.assignments
      })
    }
  }

  /**
   * Produce custom table headers
   * @return {JSX} Material UI Table Components
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

  /**
   * Add new scout and update the table
   * @param {string} scoutId A unique ID representing a scout.
   */
  async addAScout (scoutid) {
    await addScouts(this.state.gameID, scoutid)
    await this.requestAssignmentData()
    this.setState({ open: false }, this.forceUpdate())
  }

  /** Toggle to open add Scout Form */
  handleClickOpen () {
    this.setState({ open: true })
  }

  /** Toggle to close add Scout Form */
  handleClose () {
    this.setState({ open: false })
  }

  /** Renders a table of Assignments */
  render () {
    const { assignment } = this.state
    return (
      <div className='App'>
        {/* Header */}
        <Header text={`${this.state.gameDate} | ${this.state.gameData}`} />
        {/* Button to invoke add scout form */}
        <Paper elevation={1}>
          <Button onClick={this.handleClickOpen}>Assign a Scout</Button>
        </Paper>
        <br />
        {/* Add a scout form */}
        <AssignForm
          open={this.state.open}
          handleClose={this.handleClose}
          addAScout={this.addAScout} />
        {/* Check if assignment data is loaded */}
        {assignment.length ? (
          <Tables
            mapHeaders={this.mapAssignHeaders()}
            mapRows={this.mapAssignRows(assignment)}
          />
        ) : (this.state.noAssignment ? '' : <Load />)}
        {/* Load a message if no assignments found */}
        {this.state.noAssignment ? (
          <div>
            <Paper elevation={1}>
              <br />
              <Typography component='p'>
                No Assignments Found
              </Typography>
              <br />
            </Paper>
          </div>
        ) : ''}
      </div>
    )
  }
}
