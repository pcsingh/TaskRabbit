import React from 'react';
import LoginComponent from './components/login';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import SignUpComponent from './components/signup';
import { Provider } from "react-redux";
import store from "./store";
import { LOGIN_SUCCESS } from './actions/types'
import LandingPage from './components/landingPage';
import TaskList from './components/taskList';

function App() {
  if (localStorage.getItem("user") && localStorage.token) {
		console.log('Local Storage user is', localStorage.user)
		store.dispatch({ type: LOGIN_SUCCESS, payload: { user: JSON.parse(localStorage.getItem("user")), token: localStorage.token } });
	}

  return (
    <Provider store={store}>
			<Router>
				<>
					<Routes>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/login" component={LoginComponent} />
						<Route exact path="/signup" component={SignUpComponent} />
            <Route exact path="/task" component={TaskList} />
					</Routes>
				</>
			</Router>
		</Provider>
  );
}

export default App;
