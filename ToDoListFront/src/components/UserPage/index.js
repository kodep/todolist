import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MyPaper, MyLink } from './style'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { UserBar } from '../UserBar'
import { ModifyItem } from '../ModifyItem' 
import { ListTable } from '../ListTable'
import { NotFound } from '../NotFound'
import { AddToDo } from '../AddToDo'


function UserPage() {
  const { t } = useTranslation('CreatePage')
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token') != null)
  return (
      <>
      <CssBaseline />
    {isLogin && 
      <Container xl={12}>
        <UserBar setIsLogin={setIsLogin}/>
        <MyPaper>
          <Grid container direction="column" >
            <Grid item xs={12}> 
              <MyLink component={ RouterLink } to={'/addtodo'} color="secondary">{t('AddLink')}</MyLink>
            </Grid>
            <Grid item>
          <Switch>
            <Route exact path='/' render={() => <ListTable/>}/>
            <Route exact path="/addtodo" render={() => <AddToDo />} />
            <Route exact path="/:num" render={(props) => <ModifyItem router={props}/>} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
          </Grid>
          </Grid>
        </MyPaper>
      </Container>
      }
    {!isLogin && <Redirect to='/login' />}
    </>
    )
}

export { UserPage }