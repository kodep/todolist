import { gql } from 'apollo-boost'

const LOGIN_MUTATION = gql`
  mutation userLogin($login: String, $password: String) {
    login(username: $login, password: $password) {
      status
      token
    }
  }
`

const REGISTRATION_MUTATION = gql`
  mutation userRegistration($login: String, $password: String, $email: String) {
    registration(username: $login, password: $password, email: $email) {
      status
      token
    }
  }
`
const USER = gql`
  query me {
    me {
      username
    }
  }
`

const GETUSERLIST = gql`
  query list($orderBy: String, $orderGo: String) {
    getUserListByParam(orderBy:$orderBy, orderGo:$orderGo) {
      id
      text
      priority
      closeDate
      isClosed
    }
  }
`

const UPDATEISCLOSED = gql`
  mutation updateIsClosed($id:ID){
    updateIsClosed(id: $id){
      status
    }
  }
`
const GETITEM = gql`
  query getItem($id:ID){
    getToDoItemByID(id: $id){
      id
      text
      priority
      closeDate
      isClosed
    }
  }
`

const UPDATEITEM = gql`
  mutation updateToDoItem($id: ID, $text: String, $closeDate: DateTime, $priority: Int, $isClosed: Boolean){
    updateToDoItem(id: $id, text: $text, closeDate: $closeDate, priority: $priority, isClosed: $isClosed){
      status
    }
  }
`
const ADDITEM = gql`
  mutation addItem($text: String, $closeDate: DateTime, $priority: Int){
    addToDoItem(text: $text, closeDate: $closeDate, priority: $priority){
      status
    }
  }
`
const REMOVEITEM = gql`
  mutation removeItem($id:ID){
    deleteById(id: $id){
      status
    }
  }
`

export { LOGIN_MUTATION, REGISTRATION_MUTATION, USER, GETUSERLIST, UPDATEISCLOSED, GETITEM, UPDATEITEM, ADDITEM, REMOVEITEM }