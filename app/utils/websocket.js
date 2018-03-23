export const setupLogSocket = ( token, user_id, onMessage ) => {
    return new Promise( ( resolve, reject ) => {
        const console_socket = new WebSocket( 'wss://screeps.com/socket/websocket' );

        let should_output = false;

        console_socket.on( 'open', () => {
            console_socket.send( 'auth ' + token );
        } );

        console_socket.on( 'message', ( message ) => {
            if( message.startsWith( 'auth ok' ) ) {
                console_socket.send( 'subscribe user:' + user_id + '/console' );
                should_output = true;
                resolve( console_socket );
            } else if( should_output ) {
                let parsed_message = JSON.parse( message );
                
                if( parsed_message.length >= 2 && parsed_message[ 1 ].messages && parsed_message[ 1 ].messages.log && parsed_message[ 1 ].messages.log.length > 0 ) {
                    parsed_message[ 1 ].messages.log.forEach( onMessage );
                }
                if( parsed_message.length >= 2 && parsed_message[ 1 ].messages && parsed_message[ 1 ].messages.error && parsed_message[ 1 ].messages.error.length > 0 ) {
                    parsed_message[ 1 ].messages.log.forEach( onMessage );
                }
            }
        } );
    } );
};
