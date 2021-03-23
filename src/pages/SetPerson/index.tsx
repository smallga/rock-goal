import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import './style.scss'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Link,
} from "react-router-dom";
import { initRouteGoalAccount, initRouteGoal } from '../../utility/lib/common';
import { TextField } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { green } from '@material-ui/core/colors';

export default class SetPerson extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      routerInfos: [],
      routerGoalAccounts: [],
      addName: '',
    }
  }

  componentDidMount() {
    let routerGoalAccountsSession = sessionStorage.getItem('routerGoalAccounts')
    if(typeof routerGoalAccountsSession === 'string') {
      let routerGoalAccounts =  JSON.parse(sessionStorage.getItem('routerGoalAccounts') || '{}')
      this.setState({ routerGoalAccounts: routerGoalAccounts })
    }
    else {
      this.initUserAccount();
    }
  }

  initUserAccount() {
    let userAccount = initRouteGoalAccount();
    this.setState({ routerGoalAccounts: userAccount });
  }

  handleNameChange(index: string, event: any) {
    const { routerGoalAccounts } = this.state
    routerGoalAccounts[index].name = event.target.value
    this.setState({ routerGoalAccounts: routerGoalAccounts })
  }

  handleDeleteAccount(index: string) {
    const { routerGoalAccounts } = this.state
    delete routerGoalAccounts[index];
    // routerGoalAccounts.splice(index, 1);
    this.setState({ routerGoalAccounts: routerGoalAccounts })
  }

  handleSearchNameChange(name: string) {
    this.setState({ addName: name })
  }

  addAccount() {
    const { addName, routerGoalAccounts } = this.state;
    routerGoalAccounts.push({ name: addName, ..._.cloneDeep(initRouteGoal()) });
    this.setState({ routerGoalAccounts: routerGoalAccounts })
  }

  handleNextRoute() {
    const { routerGoalAccounts } = this.state;
    console.log(_.filter(routerGoalAccounts, account => (account !== null)))
    sessionStorage.setItem('routerGoalAccounts', JSON.stringify(_.filter(routerGoalAccounts, account => (!_.isEmpty(account)))))
  }

  render() {
    const { routerGoalAccounts, addName } = this.state;
    return (
      <Fragment>
        <h2>設定人員</h2>
        <div className="rock-person__new-person">
          <TextField
            id="new-person"
            placeholder="新增人員名稱"
            variant="outlined"
            value={addName}
            className="rock-person__new-person__input"
            onChange={(event) => { this.handleSearchNameChange(event.target.value) }}
          />
          <Button
            variant="contained"
            style={{ color: 'white', background: green[500] }}
            onClick={() => { this.addAccount() }}
          >新增</Button>
        </div>
        <TransitionGroup className="rock-person__list">
          {
            Object.keys(routerGoalAccounts).map(itemKey => {
              return <CSSTransition
                key={itemKey}
                classNames="move"
                timeout={{ enter: 300, exit: 300 }}
              >
                <div className="rock-person__item">
                  <TextField
                    required
                    key={itemKey}
                    id={`name-input-${itemKey}`}
                    value={routerGoalAccounts[itemKey].name}
                    label="名稱"
                    onChange={(event) => { this.handleNameChange(itemKey, event) }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    className='ic-btn'
                    onClick={() => { this.handleDeleteAccount(itemKey) }}
                  ><DeleteIcon /></Button>
                </div>
              </CSSTransition>
            }
            )
          }
        </TransitionGroup>
        <Link to="/OptionStart/settingRoute" onClick={() => this.handleNextRoute()}>
          <Button variant="contained" color="primary">
            下一步 &gt;
          </Button>
        </Link>
      </Fragment>
    )
  }
}