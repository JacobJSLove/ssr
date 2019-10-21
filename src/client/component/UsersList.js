import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>;
        });
    }

    render() {
        return (
            <div>
				List of users:
				<ul>{this.renderUsers()}</ul>
			</div>
        );
    }
}


const mapStateToProps = state => {
    return { users: state.users };
};

function loadData() {
    console.log('Load some data');
}

export { loadData };
export default connect(mapStateToProps, { fetchUsers })(UsersList);