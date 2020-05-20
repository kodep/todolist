import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { NotFound } from './components/NotFound'
import { UserPage } from './components/UserPage'
import './App.css'

function App() {
  const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
  )
  return (
    <Suspense fallback={ <Loader /> }>
      <div >
        <Router>
          <Switch>
            <Route exact path="/login" render={() => <LoginPage />} />
            <Route path="/" render={() => <UserPage />} />
            <Route exact path="*" render={() => <NotFound />} />
          </Switch>
        </Router>
      </div>
    </Suspense>
  )
}

export default App
