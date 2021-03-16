"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.routerGoalStatusEnum = void 0;
var react_1 = require("react");
var rock_jpg_1 = require("../../assest/images/rock.jpg");
var lodash_1 = require("lodash");
require("./style.scss");
var styles_1 = require("@material-ui/core/styles");
var InputLabel_1 = require("@material-ui/core/InputLabel");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var FormControl_1 = require("@material-ui/core/FormControl");
var Select_1 = require("@material-ui/core/Select");
var Button_1 = require("@material-ui/core/Button");
var blueGrey_1 = require("@material-ui/core/colors/blueGrey");
var blueGreycolor = blueGrey_1["default"][800];
var theme = styles_1.createMuiTheme({
    palette: {
        primary: blueGrey_1["default"]
    }
});
var useStyles = function (theme) { return ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}); };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        //切換 focusID 讓畫面Focus 當前 focusUnitId 的單位
        _this.handleNameChange = function (event) {
            _this.setState({ selectName: event.target.value });
        };
        _this.handleRouterNumChange = function (event) {
            _this.setState({ selectRouterNum: event.target.value });
        };
        _this.handleStatusChange = function (event) {
            _this.setState({ selectRouterStatus: event.target.value });
        };
        _this.handleConfirmClick = function () {
            var _a = _this.state, userAccount = _a.userAccount, selectName = _a.selectName, selectRouterNum = _a.selectRouterNum, selectRouterStatus = _a.selectRouterStatus;
            var findAccount = lodash_1["default"].find(userAccount, function (account) { return (account.name === selectName); });
            if (!lodash_1["default"].isEmpty(findAccount)) {
                var findRouter = lodash_1["default"].find(findAccount.routerGoal, function (routerGoal) { return (routerGoal.number === selectRouterNum); });
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
                var topCount_1 = 0;
                var zone2Count_1 = 0;
                var zone1Count_1 = 0;
                lodash_1["default"].each(findAccount.routerGoal, function (routerGoal) {
                    switch (routerGoal.status) {
                        case routerGoalStatusEnum.ZONE_1:
                            zone1Count_1 += 1;
                            break;
                        case routerGoalStatusEnum.ZONE_2:
                            zone2Count_1 += 1;
                            break;
                        case routerGoalStatusEnum.TOP:
                            topCount_1 += 1;
                            break;
                        default:
                            break;
                    }
                });
                console.log(topCount_1, zone2Count_1, zone1Count_1);
                findAccount.topCount = topCount_1;
                findAccount.zone2Count = zone2Count_1;
                findAccount.zone1Count = zone1Count_1;
                console.log(findAccount);
                console.log(userAccount);
                _this.setState({ userAccount: userAccount });
                alert('成功');
            }
        };
        _this.state = {
            userAccount: [],
            test: true,
            routerCount: 8,
            initAccountRouterGoal: [],
            selectName: '百八',
            selectRouterNum: 1,
            selectRouterStatus: '1'
        };
        return _this;
    }
    Main.prototype.componentDidMount = function () {
        this.initAccount();
    };
    Main.prototype.initAccount = function () {
        this.initRouterGoal();
        // this.initUserAccount();
    };
    Main.prototype.initRouterGoal = function () {
        var routerCount = this.state.routerCount;
        var initRouterGoalModel = [];
        for (var i = 0; i < routerCount; i++) {
            initRouterGoalModel.push({ number: i + 1, status: routerGoalStatusEnum.NONE });
        }
        var initAccountRouterGoal = { routerGoal: initRouterGoalModel, topCount: 0, zone2Count: 0, zone1Count: 0, zone1Att: 0, zone2Att: 0, startAtt: 0 };
        var userAccount = [];
        userAccount.push(__assign({ name: '百八' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: '史蛋' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: '米踢' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: '胡真' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: 'KAI B' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: '孫蝸' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: 'Yolin' }, initAccountRouterGoal));
        this.setState({ userAccount: userAccount });
        this.setState({ initAccountRouterGoal: initAccountRouterGoal });
    };
    Main.prototype.initUserAccount = function () {
        var initAccountRouterGoal = this.state.initAccountRouterGoal;
        var userAccount = [];
        userAccount.push(__assign({ name: '百八' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: '史蛋' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: '米踢' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: '胡真' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: 'KAI B' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: '孫蝸' }, initAccountRouterGoal));
        userAccount.push(__assign({ name: 'Yolin' }, initAccountRouterGoal));
        this.setState({ userAccount: userAccount });
    };
    //計算是誰贏
    Main.prototype.setWhoWin = function () {
        var userAccount = this.state.userAccount;
    };
    Main.prototype.render = function () {
        var classes = this.props.classes;
        var _a = this.state, userAccount = _a.userAccount, selectName = _a.selectName, routerCount = _a.routerCount, selectRouterNum = _a.selectRouterNum, selectRouterStatus = _a.selectRouterStatus;
        return (react_1["default"].createElement("div", { className: "rock-bg" },
            react_1["default"].createElement("img", { src: rock_jpg_1["default"] }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(FormControl_1["default"], { variant: "filled", className: classes.formControl },
                    react_1["default"].createElement(InputLabel_1["default"], { id: "select-anme" }, "\u4EBA\u54E1"),
                    react_1["default"].createElement(Select_1["default"], { labelId: "select-anme", id: "select-anme", value: selectName, onChange: this.handleNameChange }, lodash_1["default"].map(userAccount, function (account) { return (react_1["default"].createElement(MenuItem_1["default"], { value: account.name }, account.name)); })))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(FormControl_1["default"], { variant: "filled", className: classes.formControl },
                    react_1["default"].createElement(InputLabel_1["default"], { id: "select-router" }, "\u8DEF\u7DDA"),
                    react_1["default"].createElement(Select_1["default"], { labelId: "select-router", id: "select-router", value: selectRouterNum, onChange: this.handleRouterNumChange }, lodash_1["default"].map(lodash_1["default"].range(1, routerCount + 1), function (number) { return (react_1["default"].createElement(MenuItem_1["default"], { value: number },
                        "\u8DEF\u7DDA",
                        number)); })))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(FormControl_1["default"], { variant: "filled", className: classes.formControl },
                    react_1["default"].createElement(InputLabel_1["default"], { id: "select-anme" }, "\u6210\u7E3E"),
                    react_1["default"].createElement(Select_1["default"], { labelId: "select-anme", id: "select-anme", value: selectRouterStatus, onChange: this.handleStatusChange },
                        react_1["default"].createElement(MenuItem_1["default"], { value: "4" }, "TOP"),
                        react_1["default"].createElement(MenuItem_1["default"], { value: "3" }, "ZONE_2"),
                        react_1["default"].createElement(MenuItem_1["default"], { value: "2" }, "ZONE_1"),
                        react_1["default"].createElement(MenuItem_1["default"], { value: "1" }, "NONE")))),
            react_1["default"].createElement(styles_1.ThemeProvider, { theme: theme },
                react_1["default"].createElement(Button_1["default"], { variant: "contained", color: "primary", onClick: this.handleConfirmClick }, "\u9001\u51FA")),
            react_1["default"].createElement("div", { className: "left" },
                react_1["default"].createElement("span", { className: "md-title w-70" }, "\u540D\u5B50"),
                react_1["default"].createElement("span", { className: "w-35" }, "T"),
                react_1["default"].createElement("span", { className: "w-35" }, "Z2"),
                react_1["default"].createElement("span", { className: "w-35" }, "Z1"),
                react_1["default"].createElement("span", { className: "w-35" }, "Z2t"),
                react_1["default"].createElement("span", { className: "w-35" }, "Z1t"),
                react_1["default"].createElement("span", { className: "w-35" }, "Stt")),
            react_1["default"].createElement("div", { className: "left" }, lodash_1["default"].map(userAccount, function (account) { return (react_1["default"].createElement("div", null,
                react_1["default"].createElement("span", { className: "md-title  w-70" }, account.name),
                react_1["default"].createElement("span", { className: "w-35" },
                    account.topCount,
                    " "),
                react_1["default"].createElement("span", { className: "w-35" },
                    account.zone2Count,
                    " "),
                react_1["default"].createElement("span", { className: "w-35" },
                    account.zone1Count,
                    " "),
                react_1["default"].createElement("span", { className: "w-35" },
                    account.zone2Att,
                    "  "),
                react_1["default"].createElement("span", { className: "w-35" },
                    account.zone1Att,
                    "  "),
                react_1["default"].createElement("span", { className: "w-35" },
                    account.startAtt,
                    "  "))); }))));
    };
    return Main;
}(react_1.Component));
exports["default"] = styles_1.withStyles(useStyles)(Main);
var routerGoalStatusEnum;
(function (routerGoalStatusEnum) {
    routerGoalStatusEnum["TOP"] = "4";
    routerGoalStatusEnum["ZONE_2"] = "3";
    routerGoalStatusEnum["ZONE_1"] = "2";
    routerGoalStatusEnum["FAIL"] = "0";
    routerGoalStatusEnum["NONE"] = "1";
})(routerGoalStatusEnum = exports.routerGoalStatusEnum || (exports.routerGoalStatusEnum = {}));
