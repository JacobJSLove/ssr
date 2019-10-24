import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './component/Header';
import { fecthCurrentUser } from './actions';

const App = ({ route }) => {
  return (
    <div>
		<Header />
		{ renderRoutes(route.routes) }
	</div>
  );
};

// loadData have store,dispatch
export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fecthCurrentUser()),
};
