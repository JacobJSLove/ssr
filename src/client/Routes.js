import React from 'react';
import { Route } from 'react-router-dom';
import Home from './component/Home';

export default () => {
    return (
        <div>
			<Route exact path="/" component={Home} />
		</div>
    )
};