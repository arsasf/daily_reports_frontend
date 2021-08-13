import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";
import SignIn from "./pages/auth/SignIn/SignIn";
import SignUp from "./pages/auth/SignUp/SignUp";
import LandingPage from "./pages/main/LandingPage/LandingPage";
import Dashboard from "./pages/main/Dashboard/Dashboard";
import EmployeeInformation from "./pages/main/EmployeeInformation/EmployeeInformation";
import ManageEmployees from "./pages/main/ManageEmployees/ManageEmployees";
import Profile from "./pages/main/Profile/Profile";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <PublicRoute path="/" exact component={LandingPage} />
              <PublicRoute
                restricted={true}
                path="/signin"
                exact
                component={SignIn}
              />
              <PublicRoute path="/signup" exact component={SignUp} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute
                path="/employee-information/:id"
                exact
                component={EmployeeInformation}
              />
              <PrivateRoute
                path="/manage-employees"
                exact
                component={ManageEmployees}
              />
              <PrivateRoute path="/profile" exact component={Profile} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
