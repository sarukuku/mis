import React from 'react'
import LabeledInput from '../labeledInput'
import CheckBoxFilterHorizontal from '../checkBoxFilterHorizontal'
import './style.scss'

export const Navbar = ({ reports, setReports, newReporter, setNewReporter, addReporter }) => {
  return (
    <>
      <CheckBoxFilterHorizontal elements={reports} setElements={setReports} label={'reporter'} />
      <LabeledInput value={newReporter} valueSetter={setNewReporter} submitHandler={addReporter} hint="Add new reporter" />
    </>
  )
}

export default Navbar
