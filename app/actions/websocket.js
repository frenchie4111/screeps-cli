import { createAction } from '~/libs/actions';

import { setupWebsocket } from '~/utils/websocket';
import { loadToken } from '~/utils/token';

const action_types = {
    ON_MESSAGE: 'ON_MESSAGES'
};

const onMessages = createAction( action_types.ON_MESSAGE );

const init = ( data ) => {
    return async ( dispatch ) => {
        console.log( 'loadToken()' )
        let users_token = await loadToken();

        setupWebsocket( users_token, ( messages ) => {
            dispatch( onMessages( messages ) );
        } );
    };
};

export default {
    action_types,
    onMessages,
    init
};
