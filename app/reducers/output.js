// @flow
import { action_types } from '../actions/websocket';

const MAX_HISTORY = 100000;

export default function output( state={ messages: [] }, action ) {
    switch( action.type ) {
        case action_types.ON_MESSAGE:
            state = Object.assign( {}, state );
            state.messages = state.messages.concat( action.data );

            if( state.messages.length > MAX_HISTORY ) {
                state.messages = state.messages.slice( state.messages.length - MAX_HISTORY, MAX_HISTORY );
            }

            return state;
        default:
            return state;
    }
}
