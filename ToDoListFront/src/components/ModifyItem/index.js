import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
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
import { GETITEM, UPDATEITEM, REMOVEITEM } from '../GraphqlSchemas'

function ModifyItem(props) {
  const { t } = useTranslation('CreatePage')
  const num = parseInt(props.router.match.params.num, 10)
  const [selectedDate, handleDateChange] = useState(new Date())
  const { loading, error, data, refetch } = useQuery(GETITEM, { variables: { id: num } })
  const [isUpdate, setIsUpdate] = useState(true)
  const [updateItem] = useMutation(UPDATEITEM)
  const [removeItem] = useMutation(REMOVEITEM)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
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
          <DateTimePicker name="date" value={data.getToDoItemByID.closeDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>
      ),
    },
  ]
  const onSubmit = (values) => {
    updateItem({variables: {id: data.getToDoItemByID.id, text: values.text, closeDate: selectedDate.toISOString(), priority: parseInt(values.priority, 10), isClosed: data.getToDoItemByID.isClosed}})
    setIsUpdate(false)
  }
  const deleteClick = () => {
    removeItem({variables: {id: data.getToDoItemByID.id}})
    setIsUpdate(false)
  }
  refetch()
  return (
    <>
      {(isUpdate || data.getToDoItemByID.id) && <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{ text: data.getToDoItemByID.text, priority: data.getToDoItemByID.priority}}
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
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    {t('Update')}
                  </Button>
                  </Grid>
                  <Grid item>
                  <Button
                    variant="contained"
                    onClick={deleteClick}
                  >
                    {t('Remove')}
                  </Button>
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />}
      {(!isUpdate || !data.getToDoItemByID.id) && <Redirect to='/' />}
    </>
  )
}

export { ModifyItem }