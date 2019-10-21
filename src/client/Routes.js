import React from 'react';
import Home from './component/Home';
import UsersList from './component/UsersList';

// export default () => {
//     return (
//         <div>
// 			<Route exact path="/" component={Home} />
// 			<Route path="/users" component={UsersList} />
// 		</div>
//     )
// };

//	for react-router-config we need to use objects for ssr!!

export default [{
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/users',
        component: UsersList
    }
]