import logo from './logo.svg';
import './App.css';
import rock from "./assest/images/rock.jpg"
import { Index } from './pages/Index/index'
import OptionStart from './pages/OptionStart/index'
import Main from './pages/Main/index'
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

function App() {
  return (
    <Router basename="/rock-goal/build">
      <div className="App">
        <div className="rock-bg">
          <Switch>
            <Route path="*">
              <AnimationApp />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function AnimationApp() {
  let location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="page-fade"
        timeout={300}
        unmountOnExit
      >
        <Switch location={location}>
          <Route exact path="/" component={Index}>
            {/* <Index /> */}
          </Route>
          <Route path="/quikStart" component={Main}>
          </Route>
          <Route path="/optionStart" component={OptionStart}>
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
