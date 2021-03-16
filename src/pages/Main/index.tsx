import React, { Component, Fragment } from 'react';
import rock from "../../assest/images/rock.jpg"
import _ from 'lodash';
import './style.scss'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import blueGrey from '@material-ui/core/colors/blueGrey';

const blueGreycolor = blueGrey[800]

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
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

class Main extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      userAccount: [],
      test: true,
      routerCount: 8,
      initAccountRouterGoal: [],
      selectName: '百八',
      selectRouterNum: 1,
      selectRouterStatus: '1',
    }
  }

  componentDidMount() {
    this.initAccount();
  }

  initAccount() {
    this.initRouterGoal();
    // this.initUserAccount();
  }

  initRouterGoal() {
    const { routerCount } = this.state
    let initRouterGoalModel: routerGoalModel[] = [];
    for (let i = 0; i < routerCount; i++) {
      initRouterGoalModel.push({ number: i + 1, status: routerGoalStatusEnum.NONE })
    }
    let initAccountRouterGoal: userAccountModel = { routerGoal: initRouterGoalModel, topCount: 0, zone2Count: 0, zone1Count: 0, zone1Att: 0, zone2Att: 0, startAtt: 0 }
    let userAccount: userAccountModel[] = [];
    userAccount.push({ name: '百八', ...initAccountRouterGoal });
    userAccount.push({ name: '史蛋', ...initAccountRouterGoal });
    userAccount.push({ name: '米踢', ...initAccountRouterGoal });
    userAccount.push({ name: '胡真', ...initAccountRouterGoal });
    userAccount.push({ name: 'KAI B', ...initAccountRouterGoal });
    userAccount.push({ name: '孫蝸', ...initAccountRouterGoal });
    userAccount.push({ name: 'Yolin', ...initAccountRouterGoal });
    this.setState({ userAccount: userAccount })
    this.setState({ initAccountRouterGoal: initAccountRouterGoal })
  }

  initUserAccount() {
    const { initAccountRouterGoal } = this.state;
    let userAccount: userAccountModel[] = [];
    userAccount.push({ name: '百八', ...initAccountRouterGoal });
    userAccount.push({ name: '史蛋', ...initAccountRouterGoal });
    userAccount.push({ name: '米踢', ...initAccountRouterGoal });
    userAccount.push({ name: '胡真', ...initAccountRouterGoal });
    userAccount.push({ name: 'KAI B', ...initAccountRouterGoal });
    userAccount.push({ name: '孫蝸', ...initAccountRouterGoal });
    userAccount.push({ name: 'Yolin', ...initAccountRouterGoal });
    this.setState({ userAccount: userAccount })
  }

  //切換 focusID 讓畫面Focus 當前 focusUnitId 的單位
  handleNameChange = (event: any) => {
    this.setState({ selectName: event.target.value })
  };

  handleRouterNumChange = (event: any) => {
    this.setState({ selectRouterNum: event.target.value })
  };

  handleStatusChange = (event: any) => {
    this.setState({ selectRouterStatus: event.target.value })
  };

  handleConfirmClick = () => {
    const { userAccount, selectName, selectRouterNum, selectRouterStatus } = this.state
    let findAccount: userAccountModel = _.find(userAccount, account => (account.name === selectName));
    if (!_.isEmpty(findAccount)) {
      let findRouter = _.find(findAccount.routerGoal, routerGoal => (routerGoal.number === selectRouterNum));
      if (findRouter !== undefined && Number(selectRouterStatus) > Number(findRouter.status)) {
        findRouter.status = selectRouterStatus;
      }
      switch (selectRouterStatus) {
        case routerGoalStatusEnum.NONE:
          findAccount.startAtt += 1;
          break;
        case routerGoalStatusEnum.ZONE_1:
          findAccount.startAtt += 1;
          findAccount.zone1Att += 1;
          break;
        case routerGoalStatusEnum.ZONE_2:
          findAccount.startAtt += 1;
          findAccount.zone1Att += 1;
          findAccount.zone2Att += 1;
          break;
        case routerGoalStatusEnum.TOP:
          findAccount.startAtt += 1;
          findAccount.zone1Att += 1;
          findAccount.zone2Att += 1;
          break;
        default:
          break;
      }
      //重新計算成員的攀點數
      let topCount = 0;
      let zone2Count = 0;
      let zone1Count = 0;
      _.each(findAccount.routerGoal, routerGoal => {
        switch (routerGoal.status) {
          case routerGoalStatusEnum.ZONE_1:
            zone1Count += 1;
            break;
          case routerGoalStatusEnum.ZONE_2:
            zone2Count += 1;
            break;
          case routerGoalStatusEnum.TOP:
            topCount += 1;
            break;
          default:
            break;
        }
      });
      console.log(topCount, zone2Count, zone1Count);
      findAccount.topCount = topCount;
      findAccount.zone2Count = zone2Count;
      findAccount.zone1Count = zone1Count;
      console.log(findAccount);
      console.log(userAccount);
      this.setState({ userAccount: userAccount });

      alert('成功');
    }
  }

  //計算是誰贏
  setWhoWin() {
    const { userAccount } = this.state
  }

  render() {
    const { classes } = this.props;
    const { userAccount, selectName, routerCount, selectRouterNum, selectRouterStatus } = this.state
    return (
      <div className="rock-bg">
        <img src={rock}></img>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="select-anme">人員</InputLabel>
            <Select
              labelId="select-anme"
              id="select-anme"
              value={selectName}
              onChange={this.handleNameChange}
            >
              {
                _.map(userAccount, account => (
                  <MenuItem value={account.name}>{account.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="select-router">路線</InputLabel>
            <Select
              labelId="select-router"
              id="select-router"
              value={selectRouterNum}
              onChange={this.handleRouterNumChange}
            >
              {
                _.map(_.range(1, routerCount + 1), number => (
                  <MenuItem value={number}>路線{number}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="select-anme">成績</InputLabel>
            <Select
              labelId="select-anme"
              id="select-anme"
              value={selectRouterStatus}
              onChange={this.handleStatusChange}
            >
              <MenuItem value="4">TOP</MenuItem>
              <MenuItem value="3">ZONE_2</MenuItem>
              <MenuItem value="2">ZONE_1</MenuItem>
              <MenuItem value="1">NONE</MenuItem>
            </Select>
          </FormControl>
        </div>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" onClick={this.handleConfirmClick}>
            送出
          </Button>
        </ThemeProvider>
        <div className="left">
          <span className="md-title w-70">名子</span>
          <span className="w-35">T</span>
          <span className="w-35">Z2</span>
          <span className="w-35">Z1</span>
          <span className="w-35">Z2t</span>
          <span className="w-35">Z1t</span>
          <span className="w-35">Stt</span>
        </div>
        <div className="left">
          {
            _.map(userAccount, account => (
              <div>
                <span className="md-title  w-70">{account.name}</span>
                <span className="w-35">{account.topCount} </span>
                <span className="w-35">{account.zone2Count} </span>
                <span className="w-35">{account.zone1Count} </span>
                <span className="w-35">{account.zone2Att}  </span>
                <span className="w-35">{account.zone1Att}  </span>
                <span className="w-35">{account.startAtt}  </span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(Main)

export interface userAccountModel {
  name?: string;
  routerGoal: routerGoalModel[];
  topCount: number;
  zone2Count: number;
  zone1Count: number;
  zone1Att: number;
  zone2Att: number;
  startAtt: number;
}

export interface routerGoalModel {
  number: number;
  status: routerGoalStatusEnum;
}

export enum routerGoalStatusEnum {
  TOP = '4',
  ZONE_2 = '3',
  ZONE_1 = '2',
  FAIL = '0',
  NONE = '1',
}