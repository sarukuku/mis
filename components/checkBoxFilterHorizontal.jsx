import React, {useState} from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup} from '@material-ui/core'

const CheckBoxFilterHorizontal = ({elements, setElements, label}) => {
    const [all, setAll] = useState(true)

    const handleElementChange = (el, checked) => {
        if (!checked) {
            setAll(false)
        }
        elements.filter(r => r[label] === el[label]).forEach(r => (r.hidden = !checked))
        setElements([...elements])
    }

    const toggleAll = () => {
        elements.map(el => (el.hidden = all))
        setAll(!all)
        setElements([...elements])
    }

    return (
        <FormControl>
        <FormGroup row>
                {elements.length > 1 && <FormControlLabel
                    key={'filter-title-id'}
                    labelPlacement="end"
                    control={<Checkbox checked={all} color="default" onChange={toggleAll}/>}
                    label={'All'}
                />}
                {elements.map(el => (
                    <FormControlLabel
                        key={`filter-${el[label]}`}
                        labelPlacement="end"
                        control={<Checkbox checked={!el.hidden} color="default"
                                           onChange={e => handleElementChange(el, e.target.checked)}/>}
                        label={el[label]}
                    />
                ))}
        </FormGroup>
        </FormControl>

    )
}

export default CheckBoxFilterHorizontal
