import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Form } from 'react-final-form'
import { TextField } from 'mui-rff'
import { useTranslation } from 'react-i18next'
import client from '../ApolloClient'
import { LOGIN_MUTATION } from '../GraphqlSchemas'
import { FormDiv } from './style.js'

function Login(props) {
  const { t } = useTranslation('LoginPage')
  const formFields = [
    {
      field: (
        <TextField
          label={t('Login')}
          variant='outlined'
          margin='normal'
          fullWidth
          color="secondary"
          name="login"
        />
      ),
    },
    {
      field: (
        <TextField
          label={t('Password')}
          type='password'
          variant='outlined'
          margin='normal'
          fullWidth
          color="secondary"
          name="password"
        />
      )
    }
  ]
  const onSubmit = values => {
    client
      .mutate({ variables: { login: values.login, password: values.password }, mutation: LOGIN_MUTATION })
      .then(res => {
        localStorage.setItem('token', res.data.login.token)
        props.setEntered(true)
      })
      .catch(err => alert('Wrong login or password!'))
  }
  return (
    <>
      <Form
        fullWidth
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <FormDiv onSubmit={handleSubmit} noValidate>
            <Grid container direction="column">
              {formFields.map((item, idx) => (
                <Grid item key={idx}>
                  {item.field}
                </Grid>
              ))}
              <Grid item>
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                >
                  {t('ButtonSingIn')}
                </Button>
              </Grid>
            </Grid>
          </FormDiv>)}
      />

    </>
  )
}

export { Login }