import React from 'react';
import './App.css';
import Post from './Components/Post/Post'
import Nav from './Components/Nav/Nav'
import Form from './Components/Form/Form'
import Dashboard from './Components/Dashboard/Dashboard'
import Auth from './Components/Auth/Auth'
import {Provider} from 'react-redux';
import store from './redDucks/store';
import {HashRouter, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="App">
          <Nav/>
          <Switch>
            <Route exact path='/' component={Auth} />
            <Route path='/post' component={Post} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
