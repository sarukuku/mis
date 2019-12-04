import React from 'react'
import { TextField } from 'material-ui'

export const LabeledInput = ({ value, valueSetter, submitHandler }) => {
  return (
    <div>
      <TextField value={value} onChange={e => valueSetter(e.target.value)} hintText="Write here a note :)" />
      <button onClick={submitHandler}>Add Note</button>
    </div>
  )
}

export default LabeledInput
