import React, { useEffect } from 'react';
// import Auth from './containers/Auth/Auth';
import Dashboard from './containers/Dashboard/Dashboard';
import Layout from './hoc/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
import Projects from './containers/Projects/Projects';
import AddProject from './containers/Projects/AddProject';
import Notifications from './containers/Notifications/Notifications';
import Team from './containers/Team/Team';
import Account from './containers/Account/Account';
import AddMember from './containers/Team/AddMember';
import ProjectDetails from './containers/Projects/ProjectDetails';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Landing from './components/Landing/Landing';
import Alert from './hoc/Layout/Alert';
// Redux
import { Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
   
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store} >
        <Layout>
        <Alert />
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/addMember" component={AddMember} />
            <Route path="/account" component={Account} />
            <Route path="/team" component={Team} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/addProject" component={AddProject} />
            <Route path="/projects" component={Projects} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
          <Route path='/' exact component={Landing} />
        </Layout>
    </Provider>
  );
}

export default App;
