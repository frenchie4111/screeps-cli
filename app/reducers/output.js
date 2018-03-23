// @flow
import { action_types as websocket_action_types } from '../actions/websocket';
import { action_types as output_action_types } from '../actions/output';

const MAX_HISTORY = 100000;

export default function output( state={ messages: [], scroll_lock: true }, action ) {
    switch( action.type ) {
        case websocket_action_types.ON_MESSAGE:
            state = Object.assign( {}, state );
            state.messages = state.messages.concat( action.data );

            if( state.messages.length > MAX_HISTORY ) {
                state.messages = state.messages.slice( state.messages.length - MAX_HISTORY, MAX_HISTORY );
            }

            return state;
        case output_action_types.SET_SCROLL_LOCK:
            state = Object.assign( {}, state );
            state.scroll_lock = action.data;
            return state;
        default:
            return state;
    }
}
