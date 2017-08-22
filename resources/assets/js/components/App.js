import React from 'react';
import { HashRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Clients from './Clients';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isAuthenticated: false,
			token: null
		};
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.refresh = this.refresh.bind(this);
	}

	componentWillMount() {
		const lsToken = localStorage.getItem('jwt'); 
		if (lsToken) {
			this.authenticate(lsToken);
		} 
	}

	authenticate(token) {
		this.setState({
			isAuthenticated: true,
			token: token
		});
		localStorage.setItem('jwt', token);
	}

	logout() {
		this.setState({
			isAuthenticated: false,
			token: null
		});
	}

	refresh() {
		return axios.get('/learn/jwt/public/api/refreshToken', {
			headers: { 'Authorization': 'Bearer ' + this.state.token }
		})
		.then((response) => {
			const token = response.data.token;
			this.authenticate(token);
		})
		.catch((error) => {
			console.log('Error!', error);
		});
	}

	render() {
		return (
			<HashRouter>
				<div>
					<Menu isAuthenticated={this.state.isAuthenticated} logout={this.logout} />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/login' render={(props) => <Login authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} {...props} />} />
						<PrivateRoute exact path='/clients' component={Clients} isAuthenticated={this.state.isAuthenticated} token={this.state.token} refresh={this.refresh} />
					</Switch>
				</div>
			</HashRouter>
		);
	}
}

const PrivateRoute = ({ component: Component, isAuthenticated, token, ...rest }) => (
	<Route {...rest} render={props => (
		isAuthenticated ? (
			<Component {...props} {...rest} token={token} isAuthenticated={isAuthenticated} />
		) : (
			<Redirect to={{
				pathname: '/login',
				state: { from: props.location }
			}} />
		)
	)} />
);

const Menu = (props) => (
	<ul className="list-inline">
		<li>
			<NavLink exact activeClassName="active" to="/">
				Home
			</NavLink>
		</li>
		<li>
			<NavLink exact activeClassName="active" to="/login">
				Login
			</NavLink>
		</li>
		<li>
			<NavLink exact activeClassName="active" to="/clients">
				Clients
			</NavLink>
		</li>
		{props.isAuthenticated ?
			<li>
				<a href="#" onClick={props.logout}>
					Logout
				</a>
			</li>
			:
			null	
		}
	</ul>
);

export default App;