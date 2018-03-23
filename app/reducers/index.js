// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import output from './output';
import input from './input';

const rootReducer = combineReducers( {
    router,

    output,
    input
} );

export default rootReducer;
