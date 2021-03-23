import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import './style.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { initRouteGoalAccount, initRouteGoal } from '../../utility/lib/common';
import SetPerson from '../SetPerson';
import SetRoute from '../SetRoute';
import OptionStartGoal from '../OptionStartGoal';

const blueGreycolor = blueGrey[800]

const startTheme = createMuiTheme({
  palette: {
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    }
  },
});


export default class OptionStart extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    let location = this.props.location;
    let { path } = this.props.match;
    return (
      <div>
        <ThemeProvider theme={startTheme}>
          <Switch location={location}>
            <Route path={`${path}/settingPerson`}>
              <SetPerson/>
            </Route>
            <Route path={`${path}/settingRoute`}>
              <SetRoute/>
            </Route>
            <Route path={`${path}/start`}>
              <OptionStartGoal/>
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    )
  }
}