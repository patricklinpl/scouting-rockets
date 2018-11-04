import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'

/** Material UI Table styles */
const styles = () => ({
  root: {
    width: '100%',
    marginTop: 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
})

/** Renders a Material UI table */
const Tables = props => {
  const classes = styles()
  return (
    <div className='App'>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            {props.mapHeaders}
          </TableHead>
          <TableBody>
            {props.mapRows}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

Tables.propTypes = {
  mapHeaders: PropTypes.func.isRequired,
  mapRows: PropTypes.func.isRequired
}

export default Tables
