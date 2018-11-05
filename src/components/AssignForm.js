import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default class AssignForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scoutId: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  /** Update scout id on change */
  handleChange (event) {
    this.setState({ scoutId: event.target.value })
  }

  render () {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Add a Scout</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Add a scout to this game. The scout will not be added if they already exist or is an invalid scout id.
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin='dense'
              id='name'
              defaultValue='1'
              value={this.state.text}
              onChange={this.handleChange}
              label='Scout ID'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color='primary'>
                Cancel
            </Button>
            <Button onClick={() => this.props.addAScout(this.state.scoutId)} color='primary'>
                Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

AssignForm.propTypes = {
  open: PropTypes.bool.isRequired,
  addAScout: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}
