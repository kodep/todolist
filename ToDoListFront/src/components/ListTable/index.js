import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { useTranslation } from 'react-i18next'
import { BodyTable } from '../BodyTable'

function ListTable() {
  const { t } = useTranslation('ListPage')
  const [order, setOrder] = useState('desc')
  const [sortCeil, setSortCeil] = useState('closeDate')
  const btnSortClick = (e) => {
    e.preventDefault()
    if (e.currentTarget.id === sortCeil) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCeil(e.currentTarget.id)
      setOrder('asc')
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              {t('Ended')}
            </TableCell>
            <TableCell align="center">{t('Description')}</TableCell>
            <TableCell align="center">
              <TableSortLabel
                id="priority"
                direction={order}
                active={sortCeil === 'priority'}
                onClick={btnSortClick}
              >
                {t('Priority')}
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                id="closeDate"
                direction={order}
                active={sortCeil === 'closeDate'}
                onClick={btnSortClick}
              >
                {t('EndDate')}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <BodyTable order={order} sortCeil={sortCeil}/>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { ListTable }