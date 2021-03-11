/*
 * BeoEarth SPA
 * Copyright(c) 2009-2021, Beowurks
 * Original Author: Eddie Fann
 * License: Eclipse Public License - v 2.0 (https://www.eclipse.org/org/documents/epl-2.0/EPL-2.0.html)
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Footer from './blocks/footer';
import Header from './blocks/header';
import Contact from './contact';
import Notfound from './notfound';
import reportWebVitals from './reportWebVitals';
import './style/index.css';

require('dotenv').config({debug: true})

const routing = (
  <Router>
    <div>
      <Header/>
      <hr/>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/contact" component={Contact}/>
        <Route component={Notfound}/>
      </Switch>
      <Footer/>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
