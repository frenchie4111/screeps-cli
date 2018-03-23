// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import output from './output';

const rootReducer = combineReducers( {
    router,

    output
} );

export default rootReducer;
