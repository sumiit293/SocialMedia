import './App.css';
import './component/common/assets/scss/common.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './component/login/Login';
import { Provider } from "react-redux";
import store from './store';
import SignUp from './component/signup/SignUp';
import Profile from './component/profile/Profile';
import Home from './component/home/Home';
import BaseComponent from './component/common/base/BaseComponent';
import Chat from './component/chat/Chat';
import PrivateRoute from './component/routing/PrivateRoute';
import AccountSetting from './component/account-setting/AccountSetting';
import SearchUserPage from './component/search-user/SearchUserPage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <BaseComponent>
          <div className="App">
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/home" exact component={Home} />
              <PrivateRoute path="/chat" exact component={Chat} />
              <PrivateRoute path="/account-setting" exact component={AccountSetting} />
              <PrivateRoute path="/test" exact component={SearchUserPage} />
            </Switch>
          </div>
        </BaseComponent>
      </Router>
    </Provider>
  );
}

export default App;
