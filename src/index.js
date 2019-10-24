import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import render from './helpers/render';
import createStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com/'));
// express let go every route to react-router
app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = createStore();

  // Check current routes with routes from router
  // what components we need at this path
  // route es6 deconstruct route object
  // add store to loadingData function to manully dispatch
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null));

  Promise.all(promises).then(() => {
    res.send(render(req, store));
  });
});

app.listen(3000, () => {
  console.log('Port 3000');
});
