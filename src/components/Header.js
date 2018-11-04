import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

/** Material UI Toolbar styles */
const styles = {
  root: {
    flexGrow: 1
  }
}

/** Renders a Material UI Toolbar */
const Header = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Button variant='contained' color='primary' component={Link} to='/'>Home</Button>
          <Typography variant='h6' color='inherit' className={classes.root}>
            {props.text}
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(Header)
