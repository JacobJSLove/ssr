import React from 'react';
import Home from './component/Home';
import UsersList, { loadData } from './component/UsersList';

export default [{
        path: '/',
        component: Home,
        exact: true
    },
    {
        loadData,
        path: '/users',
        component: UsersList
    }
];

// es6 loadData:loadData

// export default () => {
//     return (
//         <div>
// 			<Route exact path="/" component={Home} />
// 			<Route path="/users" component={UsersList} />
// 		</div>
//     )
// };

//	for react-router-config we need to use objects for ssr!!