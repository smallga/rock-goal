import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import './style.scss'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const blueGreycolor = blueGrey[800]

const startTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: blueGreycolor,
    },
  },
});

const useStyles = (theme: any) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

export class Index extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      routerInfos: [],
      routerGoalAccount: [],
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>抱石大亂鬥記分板</h1>
        <h4>歡迎使用</h4>
        <ThemeProvider theme={startTheme}>
          <Link to="/quikStart">
            <Button className="mb-2" variant="contained" color="secondary">
              快速開始 &gt;
            </Button>
          </Link>
          <br></br>
          <Link to="/OptionStart/settingPerson">
            <Button variant="contained" color="primary">
              開始 &gt;
            </Button>
          </Link>
        </ThemeProvider>
      </div>
    )
  }
}