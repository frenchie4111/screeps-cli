import api from './api';
import WebSocket from 'ws';

let cached_socket = null; // This just prevents hot-module-replacement from opening sockets every time

const createWebsocket = ( token, user_id, onMessages ) => {
    return new Promise( ( resolve, reject ) => {
        if( cached_socket ) return;
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
                cached_socket = console_socket;

                let parsed_message = JSON.parse( message );

                let messages = [];

                if( parsed_message.length >= 2 && parsed_message[ 1 ].messages && parsed_message[ 1 ].messages.log && parsed_message[ 1 ].messages.log.length > 0 ) {
                    parsed_message[ 1 ].messages.log
                        .forEach( ( text ) => {
                            messages.push( { type: 'log', text } )
                        } );
                }

                if( parsed_message.length >= 2 && parsed_message[ 1 ].messages && parsed_message[ 1 ].messages.error && parsed_message[ 1 ].messages.error.length > 0 ) {
                    parsed_message[ 1 ].messages.error
                        .forEach( ( text ) => {
                            messages.push( { type: 'error', text } )
                        } );
                }

                onMessages( messages );
            }
        } );
    } );
};

const setupWebsocket = async ( token, onMessages ) => {
    let me = await api.requestServer( '/api/auth/me', null, { body: null, token, method: 'GET' } );
    me = await me.json();

    return await createWebsocket( token, me._id, onMessages );
};

export { setupWebsocket };
