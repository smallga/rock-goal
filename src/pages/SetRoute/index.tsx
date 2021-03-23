import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import './style.scss'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Link,
} from "react-router-dom";
import { initRouteGoalAccount, initRouteGoal } from '../../utility/lib/common';
import { colors, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { green } from '@material-ui/core/colors';
import { RouterLevelEnum } from '../../utility/enum/router-level.enum';

export default class SetPerson extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      routerInfos: [],
    }
  }

  componentDidMount() {
    let routerInfosSession = sessionStorage.getItem('routerInfos')
    if(typeof routerInfosSession === 'string') {
      let routerInfos =  JSON.parse(sessionStorage.getItem('routerInfos') || '{}')
      this.setState({ routerInfos: routerInfos })
    }
  }

  addRoute() {
    const { routerInfos } = this.state
    routerInfos.push({ level: RouterLevelEnum.V0, color: '' })
    this.setState({ routerInfos: routerInfos })
  }

  handleRouteNameChange(index: string, color: string) {
    const { routerInfos } = this.state
    routerInfos[index].color = color
    this.setState({ routerInfos: routerInfos })
  }

  handleDeleteRoute(index: string) {
    const { routerInfos } = this.state
    delete routerInfos[index]
    this.setState({ routerInfos: routerInfos })
  }

  handleNextRoute() {
    const { routerInfos } = this.state
    sessionStorage.setItem('routerInfos', JSON.stringify(_.filter(routerInfos, route => (!_.isEmpty(route)))))
  }

  handleChangeLevel(index: string, level: any) {
    const { routerInfos } = this.state
    routerInfos[index].level = level
    this.setState({ routerInfos: routerInfos })
  }

  render() {
    const { routerInfos, addName } = this.state;
    return (
      <Fragment>
        <h2>設定路線</h2>
        <div className="rock-person__new-person">
          <Button
            variant="contained"
            style={{ color: 'white', background: green[500] }}
            onClick={() => { this.addRoute() }}
          >新增路線</Button>
        </div>
        <TransitionGroup className="rock-person__list">
          {
            Object.keys(routerInfos).map(itemKey => {
              return <CSSTransition
                key={itemKey}
                classNames="move"
                timeout={{ enter: 300, exit: 300 }}
              >
                <div className="rock-person__item">
                  <FormControl variant="filled">
                    <InputLabel id="select-anme">成績</InputLabel>
                    <Select
                      labelId="select-anme"
                      id="select-anme"
                      value={routerInfos[itemKey].level}
                      onChange={(event) => {this.handleChangeLevel(itemKey, event.target.value)}}
                    >
                      <MenuItem value="0">V0</MenuItem>
                      <MenuItem value="1">V1</MenuItem>
                      <MenuItem value="2">V2</MenuItem>
                      <MenuItem value="3">V3</MenuItem>
                      <MenuItem value="4">V4</MenuItem>
                      <MenuItem value="5">V5</MenuItem>
                      <MenuItem value="6">V6</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    key={itemKey}
                    id={`name-input-${itemKey}`}
                    value={routerInfos[itemKey].color}
                    label="顏色"
                    onChange={(event) => { this.handleRouteNameChange(itemKey, event.target.value) }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    className='ic-btn'
                    onClick={() => { this.handleDeleteRoute(itemKey) }}
                  ><DeleteIcon /></Button>
                </div>
              </CSSTransition>
            }
            )
          }
        </TransitionGroup>
        <Link to="/OptionStart/start" onClick={() => this.handleNextRoute()}>
          <Button variant="contained" color="primary">
            確定 &gt;
          </Button>
        </Link>
      </Fragment>
    )
  }
}