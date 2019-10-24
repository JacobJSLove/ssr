import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends React.Component {
  componentDidMount() {
    // No need cuz of first load on server
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  renderUsers() {
    const { users } = this.props;
    return users.map((user) => <li key={user.id}>{user.name}</li>);
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

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  fetchUsers: PropTypes.func,
};

const mapStateToProps = (state) => ({ users: state.users });

function loadData(store) {
  // manualy dispatch action for ssr
  return store.dispatch(fetchUsers());
}

// loadData:loadData es6
export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
};
