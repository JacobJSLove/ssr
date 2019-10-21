import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import render from './helpers/render';
import createStore from './helpers/createStore';

const app = express();


// express let go every route to react-router
app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore();

    // Check current routes with routes from router
    // what components we need at this path
    matchRoutes(Routes, req.path);

    res.send(render(req, store));
});

app.listen(3000, () => {
    console.log("Port 3000");
});