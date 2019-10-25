import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import render from './helpers/render';
import createStore from './helpers/createStore';

const app = express();

app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    },
  }),
);
// express let go every route to react-router
app.use(express.static('public'));
app.get('*', (req, res) => {
  // move cookie from client to server
  const store = createStore(req);

  // Check current routes with routes from router
  // what components we need at this path
  // route es6 deconstruct route object
  // add store to loadingData function to manully dispatch
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map((promise) => {
      // check if its a promise not null
      if (promise) {
        // wrapper promise to success promise.all
        return new Promise((resolve) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = render(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Port 3000');
});
