import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Login } from '../Login'
import { Registration } from '../Registration'
import { FullDiv, RegistrationDiv } from './style.js'

function LoginPage() {
  const [value, setValue] = useState(0);
  const [variant, setVariant] = useState(false);
  const [entered, setEntered] = useState(localStorage.getItem('token') != null);
  const { t } = useTranslation('LoginPage')
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setVariant(newValue === 1);
  };

  return (
    <>
      { !entered &&
        <FullDiv>
          <RegistrationDiv>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
                aria-label="LoginPage"
              >
                <Tab label={t('LoginUp')} />
                <Tab label= {t('RegistrationUp')} />
              </Tabs>
            </AppBar>
            {!variant && <Login setEntered = { setEntered } />}
            {variant && <Registration setEntered = { setEntered } />}
          </RegistrationDiv>
       </FullDiv>
    }
    { entered && <Redirect to='/'/> }
    </>
  );
}

export { LoginPage }
