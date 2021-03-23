import _ from "lodash";
import { userAccountModel } from "../../pages/Main";

export function initRouteGoalAccount() {
  let initAccountRouterGoal: userAccountModel = { topCount: 0, zone2Count: 0, zone1Count: 0, zone1Att: 0, zone2Att: 0, startAtt: 0 }
  let userAccount: userAccountModel[] = [];
  userAccount.push({ name: '百八', ..._.cloneDeep(initAccountRouterGoal) });
  userAccount.push({ name: '史蛋', ..._.cloneDeep(initAccountRouterGoal) });
  userAccount.push({ name: '米踢', ..._.cloneDeep(initAccountRouterGoal) });
  userAccount.push({ name: '胡真', ..._.cloneDeep(initAccountRouterGoal) });
  userAccount.push({ name: 'KAI B', ..._.cloneDeep(initAccountRouterGoal) });
  userAccount.push({ name: '孫蝸', ..._.cloneDeep(initAccountRouterGoal) });
  userAccount.push({ name: 'Yolin', ..._.cloneDeep(initAccountRouterGoal) });
  userAccount.push({ name: 'ED', ..._.cloneDeep(initAccountRouterGoal) });
  return userAccount;
}

export function initRouteGoal() {
  let initAccountRouterGoal: userAccountModel = { topCount: 0, zone2Count: 0, zone1Count: 0, zone1Att: 0, zone2Att: 0, startAtt: 0 }
  return initAccountRouterGoal
}