import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-final-form'
import {
  TextField,
  Select
} from 'mui-rff'
import {
  Paper,
  Grid,
  Button,
  MenuItem,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { Redirect } from 'react-router-dom'
import { ADDITEM } from '../GraphqlSchemas'

function AddToDo(props) {
  const { t } = useTranslation('CreatePage')
  const [selectedDate, handleDateChange] = useState(new Date())
  const [isUpdate, setIsUpdate] = useState(true)
  const [addItem] = useMutation(ADDITEM)
  const validate = values => {
    const errors = {}
    if (!values.text) {
      errors.text = t('WriteSomethink')
    }
    if (!values.priority ) {
      errors.priority = t('AddPriority')
    }
    return errors
  }
  const formFields = [
    {
      size: 10,
      field: (
        <TextField
          label={t('Text')}
          name="text"
          margin="none"
          required={true}
        />
      ),
    },
    {
      size: 2,
      field: (
        <Select
          name="priority"
          label={t('Priority')}
          required={true}
          formControlProps={{ margin: 'none' }}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      ),
    },
    {
      size: 12,
      field: (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker name="date" value={selectedDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>
      ),
    },
  ]
  const onSubmit = (values) => {
    addItem({variables: {text: values.text, closeDate: selectedDate.toISOString(), priority: parseInt(values.priority, 10)}})
    setIsUpdate(false)
  }
  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    {item.field}
                  </Grid>
                ))}
                <Grid item >
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    {t('Add')}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
      {!isUpdate && <Redirect to='/' />}
    </>
  )
}

export { AddToDo }