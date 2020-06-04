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
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/ProfileForms/CreateProfile';
import EditProfile from './components/ProfileForms/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Goals from './containers/Projects/Goals/Goals';
import Comments from './containers/Projects/Comments/Comments';
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
            <Route path='/profiles' component={Profiles} />
            <Route path='/profile/user/:id' component={Profile} />
            <PrivateRoute path='/project/comments/:id' component={Comments} />
            <PrivateRoute path='/project/goal/:id' component={Goals} />
            <PrivateRoute path='/project/team/:id' component={Team} />
            <PrivateRoute path="/project/:id" component={ProjectDetails} />
            <PrivateRoute path="/addMember" component={AddMember} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/notifications" component={Notifications} />
            <PrivateRoute path="/addProject" component={AddProject} />
            <PrivateRoute path="/projects" component={Projects} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
          </Switch>
          <Route path='/' exact component={Landing} />
        </Layout>
    </Provider>
  );
}

export default App;
