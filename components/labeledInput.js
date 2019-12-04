import React from 'react'
import { TextField } from 'material-ui'
import { Button } from '@material-ui/core'

export const LabeledInput = ({ value, valueSetter, submitHandler, hint }) => {
  const submitWrapper = e => {
    e.preventDefault()
    submitHandler()
  }
  return (
    <form onSubmit={submitWrapper}>
      <TextField value={value} onChange={e => valueSetter(e.target.value)} hintText={hint} />
      <Button variant="contained" color="primary" size="small" onClick={submitHandler}>
        Add
      </Button>
    </form>
  )
}

export default LabeledInput
