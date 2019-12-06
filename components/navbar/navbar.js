import React from 'react'
import LabeledInput from '../labeledInput'
import CheckBoxFilterHorizontal from '../checkBoxFilterHorizontal'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useStyles from './styles'

export const Navbar = ({ reports, setReports, newReporter, setNewReporter, addReporter }) => {
  const classes = useStyles()
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <CheckBoxFilterHorizontal elements={reports} setElements={setReports} label={'reporter'} />
        <LabeledInput
          formClass={classes.addReportInput}
          value={newReporter}
          valueSetter={setNewReporter}
          submitHandler={addReporter}
          hint="Add new reporter"
        />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
