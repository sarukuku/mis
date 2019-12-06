import React from 'react'
import { Input, InputAdornment, IconButton } from '@material-ui/core'
import { AddCircleOutline as AddIcon } from '@material-ui/icons'

export const LabeledInput = ({ value, valueSetter, submitHandler, hint, formClass }) => {
  const submitWrapper = e => {
    e.preventDefault()
    submitHandler()
  }

  return (
    <form className={formClass} onSubmit={submitWrapper}>
      <Input
        fullWidth
        type="text"
        value={value}
        onChange={e => valueSetter(e.target.value)}
        placeholder={hint}
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </form>
  )
}

export default LabeledInput
