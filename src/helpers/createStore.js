import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

export default (req) => {
  // if user dont have cookie use ''
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com/',
    header: { cokkie: req.get('cokkie') || '' },
  });

  const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

  return store;
};
