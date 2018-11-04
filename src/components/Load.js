import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

/** Material UI LinearProgress styles */
const styles = {
  root: {
    flexGrow: 1
  }
}

/** Renders a Material UI LinearProgress bar */
const Load = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <br />
      <LinearProgress />
      <br />
    </div>
  )
}

Load.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Load)
