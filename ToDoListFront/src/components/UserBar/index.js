import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import Link from '@material-ui/core/Link'
import {
    Grid,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { USER } from '../GraphqlSchemas'

function UserBar(props) {
  const { loading, error, data, refetch } = useQuery(USER)
  const { t } = useTranslation('ListPage')
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const onLinkClick = e => {
    e.preventDefault()
    props.setIsLogin(false)
    localStorage.removeItem('token')
    localStorage.removeItem('login')
  }
  refetch()
  return (
    <AppBar position="static" color="inherit" spacing={5}>
      <Toolbar>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography variant="h6" >
               {t('SiteName')}
            </Typography>
          </Grid>
          <Grid item>
            <span>
              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="body1" >
                    {t('Welcome')} {data.me.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Link color="secondary" onClick={onLinkClick}>
                    {t('Logout')}
                  </Link>
                </Grid>
              </Grid>
            </span> 
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export { UserBar }