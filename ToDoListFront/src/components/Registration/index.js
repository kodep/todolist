import React from 'react'
import { Form } from 'react-final-form';
import {
  TextField,
  Checkboxes,
} from 'mui-rff';
import {
  Grid,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next'
import { FormDiv } from './style.js'
import { REGISTRATION_MUTATION } from '../GraphqlSchemas'
import client from '../ApolloClient'

function Registration(props) {
  const { t } = useTranslation('LoginPage')
  const onSubmit = async values => {
    client
      .mutate({ variables: { login: values.login, password: values.password, email: values.email }, mutation: REGISTRATION_MUTATION })
      .then(res => {
        if (res.data.registration.status === 'OK') {
          localStorage.setItem('token', res.data.registration.token)
          props.setEntered(true)
        } else {
          alert(t('EmailIsUse'))
        }
      })
      .catch(err => alert('Some error'))
  };
  const validate = values => {
    const errors = {}
    const validEmail = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    if (!validEmail) {
      errors.email = t('WrongEmail')
    }
    if (values.password !== values.repassword) {
      errors.repassword = t('NotComparePassword')
    }
    if (values.password.length < 5) {
      errors.password = t('SmallPassword')
    }
    if (values.login.length < 5) {
      errors.login = t('SmallLogin')
    }
    return errors
  }
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
      )
    },
    {
      field: (
        <TextField
          label={t('Email')}
          variant='outlined'
          margin='normal'
          fullWidth
          color="secondary"
          name="email"
        />
      )
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
    },
    {
      field: (
        <TextField
          label={t('RePassword')}
          type='password'
          variant='outlined'
          margin='normal'
          fullWidth
          color="secondary"
          name="repassword"
        />
      )
    },
    {
      field: (
        <Checkboxes
          name="rules"
          formControlProps={{ margin: 'none' }}
          data={{ label: t('Agree'), value: false }}
        />
      ),
    }
  ]
  return (
    <>
      <Form
        fullWidth
        onSubmit={onSubmit}
        initialValues={{ email: '', login: '', password: '' }}
        validate={validate}
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
                  disabled={!values.rules}
                >
                  {t('RegistrationUp')}
                </Button>
              </Grid>
            </Grid>
          </FormDiv>)}
      />
    </>
  )
}

export { Registration }