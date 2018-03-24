// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form'

import output from './output';
import input from './input';

const rootReducer = combineReducers( {
    router,
    form,

    output,
    input
} );

export default rootReducer;
