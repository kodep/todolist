import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import { useQuery, useMutation  } from '@apollo/react-hooks'
import { Link as RouterLink } from 'react-router-dom'
import i18n from 'i18next'
import { GETUSERLIST, UPDATEISCLOSED } from '../GraphqlSchemas'

function BodyTable(props) {
  const { loading, error, data: list, refetch } = useQuery(GETUSERLIST, {variables: {orderBy: props.sortCeil, orderGo: props.order}});
  const [updateIsClosed] = useMutation(UPDATEISCLOSED);
  const checkClick = (e) => {
    e.preventDefault();
    updateIsClosed({variables: {id: e.currentTarget.id}})
  }
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const getLanguage = () => {
    return i18n.language ||
      (typeof window !== 'undefined' && window.localStorage.i18nextLng) ||
      'en';
    };
  const getDate = (item) => {
    const date = new Date(item)
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric'
    }
    return date.toLocaleString(getLanguage(), options)
  }
  refetch()
  return (
    <>
      {list.getUserListByParam.map((item, i) => (
        <TableRow key={i}>
          <TableCell padding="checkbox" align="center">
            <Checkbox
              checked={item.isClosed}
              onChange={checkClick}
              id={item.id}
            />
          </TableCell>
          <TableCell scope="row" align="center">
          <Link component={ RouterLink } to={'/' + item.id} color="secondary">{item.text}</Link>
          </TableCell>
          <TableCell align="center">{item.priority}</TableCell>
          <TableCell align="center">{getDate(item.closeDate)}</TableCell>
        </TableRow>
      ))}
    </>
  )
}

export { BodyTable }