// @flow
import { action_types } from '~/actions/input';


export default function output( state={ filter: '' }, action ) {
    switch( action.type ) {
        case action_types.FILTER_CHANGED:
            state = Object.assign( {}, state );
            state.filter = action.data;
            return state;
        default:
            return state;
    }
}
