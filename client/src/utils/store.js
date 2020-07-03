import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';

export let store;
let history = createBrowserHistory();
const reduxRouterMiddleware = routerMiddleware(history);

export function Init(solutionReducers) {
  store = createStore(
    combineReducers({
      routing: routerReducer,
      ...solutionReducers
    }),
    compose(applyMiddleware(thunk, reduxRouterMiddleware))
  );
}

export const historys = {
  ...history
};

export function getCurrentState() {
  let state = {};
  if (store) {
    state = store.getState();
  }
  return state;
}

export function subscribe(...args) {
  store.subscribe(...args);
}

export function dispatch(...args) {
  store.dispatch(...args);
}
