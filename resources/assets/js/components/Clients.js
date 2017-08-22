import React from 'react';

class Clients extends React.Component {
	constructor() {
		super();
		this.state = {
			clients: []
		}
	}

	componentWillMount() {
		this.getClients();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.token !== this.props.token) {
			this.getClients();
		}
	}

	getClients() {
		const token = this.props.token;
		axios.get('/learn/jwt/public/api/clients', {
			headers: { 'Authorization': 'Bearer ' + token }
		})
		.then((response) => {
			const clients = response.data;
			this.setState({ clients });
		})
		.catch((error) => {
			const status = error.response.status;
			if (status === 401 && this.props.isAuthenticated) {
				// logged in but invalid jwt
				this.props.refresh();
			}
		});
	}

	render() {
		return (
			<div>
				<h1>Clients</h1>
				{ this.state.clients.map((client, index) => {
					return (
						<div className="client" key={index}>
							{client.name}<br />
							{client.address}<br />
							{client.telephone}
							<hr />
						</div>
					)
				})}
			</div>
		);
	}
}

export default Clients;